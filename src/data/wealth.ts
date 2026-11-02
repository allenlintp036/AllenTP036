// 財富管理金字塔的內容。想改文字，改這個檔案就好。
// 每一層由下往上：風險管理（累積期）→ 投資／退休管理（給付期）→ 財富傳承（傳承期）

export interface WealthItem {
  name: string;
  note: string;
}

export interface WealthLayer {
  id: string;
  stage: string;
  title: string;
  goal: string;
  problem: string;
  tools: string[];
  items: WealthItem[];
}

export const layers: WealthLayer[] = [
  {
    id: 'risk',
    stage: '累積期',
    title: '風險管理',
    goal: '不因突然的疾病、意外花大錢',
    problem: '200 萬的醫藥費、500 萬的長照費',
    tools: ['醫療', '保險', '條款', '產物', '信用卡'],
    items: [
      { name: '重傷', note: '重大傷病時，醫療費用加上不能工作的收入缺口。' },
      { name: '醫療', note: '住院、手術、自費醫材等醫療費用。' },
      { name: '長照', note: '失能之後，長期需要人照顧的費用。' },
      { name: '責任', note: '不小心造成別人受傷或財物損失時，要負的賠償。' },
      { name: '財產', note: '房子、車子等財物遇到火災、竊盜或天災的損失。' },
    ],
  },
  {
    id: 'invest',
    stage: '給付期',
    title: '投資／退休管理',
    goal: '創造月現金流，不工作月月都有 5 萬可以領',
    problem: '1000 萬的退休金',
    tools: ['理財', '房地產', '基金', '貸款'],
    items: [
      { name: '定存', note: '保本、利息穩定，但成長有限。' },
      { name: '儲蓄險', note: '強迫儲蓄，可以規劃固定領回的生存金。' },
      { name: '債券', note: '定期領債息，波動通常比股票小。' },
      { name: '基金', note: '交給專業經理人操作，一次分散投資很多標的。' },
      { name: '股票', note: '長期成長潛力高，短期波動也大。' },
      { name: '房地產', note: '可以收租金，但需要的資金大、變現比較慢。' },
    ],
  },
  {
    id: 'legacy',
    stage: '傳承期',
    title: '財富傳承',
    goal: '節省大額遺產稅、把錢留給指定的人',
    problem: '1000 萬以上的稅金',
    tools: ['信託', '稅務', '法律'],
    items: [
      { name: 'What', note: '要傳承哪些資產：現金、房子、股票、保單⋯⋯' },
      { name: 'Who', note: '要留給誰，每個人分多少。' },
      { name: 'When', note: '什麼時候給：生前慢慢給，還是身後一次給。' },
      { name: 'How', note: '用什麼方式給：例如信託、保險、遺囑。' },
    ],
  },
];

export const activeIncome = ['薪資', '執行業務所得'];
export const passiveIncome = ['利息（本金）', '生存金（儲蓄險）', '債息（債券）', '盈利（股票）', '租賃（房地產）'];
