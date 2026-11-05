import { getCollection, type CollectionEntry } from 'astro:content';

export type Section = 'insurance' | 'thoughts';
export type Post = CollectionEntry<'insurance'> | CollectionEntry<'thoughts'>;

export const sectionLabel: Record<Section, string> = {
  insurance: '就事論事談保險',
  thoughts: '我在想的事',
};

export async function getPosts(section: Section): Promise<Post[]> {
  const items = (await getCollection(section)) as Post[];
  return items
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// 還沒寫完（draft: true）的文章，只拿來顯示「寫作中」的標題
export async function getUpcoming(section: Section): Promise<Post[]> {
  const items = (await getCollection(section)) as Post[];
  return items
    .filter((p) => p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getVideos() {
  return (await getCollection('videos'))
    .filter((v) => !v.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function postUrl(post: Post): string {
  return `/${post.collection}/${post.id}/`;
}

// 延伸閱讀：先用文章自己指定的，再補同區最新的，最後放一篇另一區的「換個腦袋」
export async function getRelated(post: Post, count = 3): Promise<Post[]> {
  const same = await getPosts(post.collection);
  const otherSection: Section = post.collection === 'insurance' ? 'thoughts' : 'insurance';
  const other = await getPosts(otherSection);
  const all = [...same, ...other];

  const picked: Post[] = [];
  const add = (p?: Post) => {
    if (p && p.id !== post.id && !picked.some((x) => x.collection === p.collection && x.id === p.id)) {
      picked.push(p);
    }
  };

  for (const ref of post.data.related) {
    add(all.find((p) => p.id === ref || `${p.collection}/${p.id}` === ref));
  }
  const crossOver = other[0];
  for (const p of same) {
    if (picked.length >= count - (crossOver ? 1 : 0)) break;
    add(p);
  }
  add(crossOver);
  for (const p of all) {
    if (picked.length >= count) break;
    add(p);
  }
  return picked.slice(0, count);
}

export function formatDate(d: Date): string {
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}
