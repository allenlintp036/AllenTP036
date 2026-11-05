// 推薦店家：一家店一筆。新增店家就照下面的格式多加一筆。
// - category：分類，會變成頁面上的篩選按鈕
// - spot：在哪裡，例如「廟口夜市」「七堵」
// - mustOrder：必點，可以寫好幾樣
// - note：立純想說的一句話
// - photo：自己拍的照片，放在 public/shops/ 資料夾，填檔名，例如 'lianzhen.jpg'（可不填）
// - map：Google 地圖的分享連結（可不填，不填就用店名搜尋）
// - draft: true 先藏起來不顯示

export interface Shop {
  name: string;
  city: string;
  spot: string;
  category: string;
  mustOrder: string[];
  note: string;
  photo?: string;
  map?: string;
  draft?: boolean;
}

export const shopsIntro = '我是基隆人，先從基隆在地美食開始推薦。';

// 以下是預覽用的範例，「立純說」要換成你自己的話
export const shops: Shop[] = [
  {
    name: '營養三明治',
    city: '基隆',
    spot: '廟口夜市',
    category: '小吃',
    mustOrder: ['營養三明治'],
    note: '這裡放立純的一句推薦。',
  },
  {
    name: '天一香肉羹順',
    city: '基隆',
    spot: '廟口夜市',
    category: '小吃',
    mustOrder: ['肉羹'],
    note: '這裡放立純的一句推薦。',
  },
  {
    name: '孝三大腸圈',
    city: '基隆',
    spot: '基隆市區',
    category: '小吃',
    mustOrder: ['大腸圈'],
    note: '這裡放立純的一句推薦。',
  },
  {
    name: '三兄妹雪花冰',
    city: '基隆',
    spot: '基隆市區',
    category: '甜點',
    mustOrder: ['雪花冰'],
    note: '這裡放立純的一句推薦。',
  },
  {
    name: '連珍糕餅店',
    city: '基隆',
    spot: '基隆市區',
    category: '伴手禮',
    mustOrder: ['芋泥球'],
    note: '這裡放立純的一句推薦。',
  },
  {
    name: '李鵠餅店',
    city: '基隆',
    spot: '基隆市區',
    category: '伴手禮',
    mustOrder: ['鳳梨酥', '綠豆椪'],
    note: '這裡放立純的一句推薦。',
  },
];

export const publishedShops = () => shops.filter((s) => !s.draft);

export const mapLink = (s: Shop) =>
  s.map ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name} ${s.city}`)}`;
