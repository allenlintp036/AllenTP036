// 首頁可以翻的照片，由上往下就是翻的順序。想換照片或改那句話，改這個檔案就好。
// 照片放在 public/photos/，position 是照片被裁切時要對準的位置（左右 上下）。

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
  position?: string;
  width: number;
  height: number;
}

export const photos: Photo[] = [
  {
    src: '/photos/hanok.jpg',
    alt: '立純在韓屋前，開心地指著牆上的招牌',
    caption: '看到喜歡的東西，就想指給你看',
    position: '55% 40%',
    width: 880,
    height: 1173,
  },
  {
    src: '/photos/bus-stop.jpg',
    alt: '立純穿著一身墨綠色，坐在公車站的長椅上',
    caption: '等車也要坐得有型',
    position: '50% 50%',
    width: 880,
    height: 1173,
  },
  {
    src: '/photos/burger.jpg',
    alt: '立純在漢堡店門口，學海報上的姿勢拿著點心',
    caption: '海報怎麼拿，我就怎麼拿',
    position: '50% 45%',
    width: 880,
    height: 1173,
  },
  {
    src: '/photos/duty.jpg',
    alt: '立純的梗圖：騎著腳踏車，字幕寫著「為什麼？因為這是我的職責」',
    caption: '認真起來，大概長這樣',
    position: '72% 50%',
    width: 880,
    height: 880,
  },
];
