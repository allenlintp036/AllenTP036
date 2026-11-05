"""抓國發會「景氣指標及燈號」最新資料，存成 src/data/ndc-signal.json。

資料來源：政府資料開放平臺 https://data.gov.tw/dataset/6099（國家發展委員會，每月更新）
只用 Python 內建模組。抓不到時不會改動原本的檔案，網站會沿用上次的資料。
"""

import csv
import io
import json
import sys
import urllib.request
import zipfile
from datetime import datetime, timezone
from pathlib import Path

DATASET_API = 'https://data.gov.tw/api/v2/rest/dataset/6099'
OUT = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'ndc-signal.json'
TARGET = '景氣指標與燈號.csv'
LIGHTS = {'紅', '黃紅', '綠', '黃藍', '藍'}
HEADERS = {'User-Agent': 'personal-site-build (GitHub Actions)'}


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=60) as res:
        return res.read()


def zip_name(info: zipfile.ZipInfo) -> str:
    # 檔名不是 UTF-8 時，是用 Big5 存的
    if info.flag_bits & 0x800:
        return info.filename
    try:
        return info.filename.encode('cp437').decode('big5')
    except (UnicodeEncodeError, UnicodeDecodeError):
        return info.filename


def main() -> int:
    meta = json.loads(get(DATASET_API))
    dists = meta.get('result', meta).get('distribution', [])
    url = next((d.get('resourceDownloadUrl') for d in dists if d.get('resourceDownloadUrl')), None)
    if not url:
        print('找不到下載連結', file=sys.stderr)
        return 1

    archive = zipfile.ZipFile(io.BytesIO(get(url)))
    info = next((i for i in archive.infolist() if zip_name(i) == TARGET), None)
    if info is None:
        print(f'壓縮檔裡沒有 {TARGET}', file=sys.stderr)
        return 1

    rows = []
    for r in csv.DictReader(io.StringIO(archive.read(info).decode('utf-8-sig'))):
        light = (r.get('景氣對策信號') or '').strip()
        score = (r.get('景氣對策信號綜合分數') or '').strip()
        date = (r.get('Date') or '').strip()
        if light in LIGHTS and score.isdigit() and len(date) == 6:
            rows.append({'month': f'{date[:4]}-{date[4:]}', 'score': int(score), 'light': light})

    if len(rows) < 12:
        print('資料筆數不夠，可能格式變了', file=sys.stderr)
        return 1

    data = {
        'source': 'https://data.gov.tw/dataset/6099',
        'fetchedAt': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'history': rows[-12:],
    }
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    latest = rows[-1]
    print(f"景氣燈號更新：{latest['month']} {latest['light']} {latest['score']} 分")
    return 0


if __name__ == '__main__':
    sys.exit(main())
