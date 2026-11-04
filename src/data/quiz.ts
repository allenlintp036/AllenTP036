// 「你在財富金字塔的哪一層？」小測驗的題目和結果。想改文字，改這個檔案就好。
// 每題對應金字塔的一層（由下往上），選項的 points 越高代表這層越穩。

export type LayerId = 'risk' | 'invest' | 'legacy';
export type ResultId = LayerId | 'complete';

export interface QuizQuestion {
  layer: LayerId;
  text: string;
  options: { label: string; points: number }[];
}

export const questions: QuizQuestion[] = [
  {
    layer: 'risk',
    text: '如果明天突然住院一週，自費要 20 萬，你會怎麼付？',
    options: [
      { label: '保險會理賠大部分', points: 2 },
      { label: '先用存款撐一下', points: 1 },
      { label: '老實說，可能要借錢', points: 0 },
    ],
  },
  {
    layer: 'risk',
    text: '萬一暫時不能工作，你的存款可以撐幾個月的生活費？',
    options: [
      { label: '6 個月以上', points: 2 },
      { label: '3 到 6 個月', points: 1 },
      { label: '不到 3 個月', points: 0 },
    ],
  },
  {
    layer: 'risk',
    text: '你知道自己的保單保了什麼嗎？',
    options: [
      { label: '很清楚，也知道哪裡沒保', points: 2 },
      { label: '大概知道，細節不確定', points: 1 },
      { label: '不知道，或是沒有保單', points: 0 },
    ],
  },
  {
    layer: 'invest',
    text: '除了薪水，你有其他固定進帳嗎？例如利息、股息、租金。',
    options: [
      { label: '有，而且每個月都有', points: 2 },
      { label: '有一點，但不太固定', points: 1 },
      { label: '沒有', points: 0 },
    ],
  },
  {
    layer: 'invest',
    text: '退休這件事，你現在的狀態是？',
    options: [
      { label: '有目標，每個月固定投入', points: 2 },
      { label: '想過，但還沒開始', points: 1 },
      { label: '還沒想過', points: 0 },
    ],
  },
  {
    layer: 'legacy',
    text: '你想過以後的資產要怎麼留給家人嗎？',
    options: [
      { label: '有規劃，也知道稅的問題', points: 2 },
      { label: '想過，但沒有細想', points: 1 },
      { label: '還早，沒想過', points: 0 },
    ],
  },
];

// 每層分數達到 solid 算「穩」，達到 gap 算「有缺口」，再低就是「待補」
export const thresholds: Record<LayerId, { solid: number; gap: number }> = {
  risk: { solid: 5, gap: 3 },
  invest: { solid: 3, gap: 2 },
  legacy: { solid: 2, gap: 1 },
};

export const statusLabel = { solid: '穩', gap: '有缺口', weak: '待補' } as const;

export interface QuizResult {
  layer: LayerId;
  title: string;
  body: string;
  note: string;
  code: string;
}

// 結果是「由下往上，第一個還不穩的那一層」；三層都穩就是 complete
export const results: Record<ResultId, QuizResult> = {
  risk: {
    layer: 'risk',
    title: '先把地基打穩',
    body: '你的金字塔最需要先補的是最底層。一場大病或意外，可能就把存款一次歸零，上面兩層也會跟著垮。先確認保障有沒有缺口，再往上蓋才安心。',
    note: '這一層不一定要花大錢，重點是保對地方。把你手上的保單拿給我，我幫你看哪裡有保、哪裡沒保。',
    code: '金字塔第 1 層',
  },
  invest: {
    layer: 'invest',
    title: '地基有了，接著讓錢自己長大',
    body: '保障的部分你做得不錯。下一步要想的是：哪天不工作了，每個月的錢從哪裡來？趁早開始，讓被動所得一點一點長出來。',
    note: '退休要準備多少，每個人的答案都不一樣。跟我聊聊你想過什麼樣的生活，我們一起算。',
    code: '金字塔第 2 層',
  },
  legacy: {
    layer: 'legacy',
    title: '可以開始想傳承了',
    body: '前兩層你都有基礎了。接下來可以想的是：怎麼把累積的財富，照你的意思留給重要的人，又不被稅吃掉一大塊。',
    note: '傳承同時牽涉法律、稅務和家人關係，很適合坐下來慢慢聊。',
    code: '金字塔第 3 層',
  },
  complete: {
    layer: 'legacy',
    title: '三層都有基礎了，很不簡單',
    body: '你的金字塔三層都有照顧到。接下來的重點是定期檢查：人生階段一變，像是結婚、生小孩、換工作，每一層的需求都會跟著變。',
    note: '要不要找個時間，一起把三層再對一次帳？',
    code: '金字塔三層都穩',
  },
};
