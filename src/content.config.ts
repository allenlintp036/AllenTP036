import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const post = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tag: z.string(),
  readingMinutes: z.number().default(5),
  draft: z.boolean().default(false),
  // 想手動指定「延伸閱讀」時填文章檔名（不含 .md），沒填就自動挑
  related: z.array(z.string()).default([]),
});

const insurance = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insurance' }),
  schema: post,
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: post,
});

const videos = defineCollection({
  loader: file('./src/data/videos.json'),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    channel: z.string().default(''),
    note: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const questions = defineCollection({
  loader: file('./src/data/questions.json'),
  schema: z.object({
    question: z.string(),
    options: z.array(z.string()).min(2).max(4),
    myTake: z.string(),
    // 想讓讀者看完選擇後繼續讀的文章，例如 thoughts/insurance-is-philosophy
    readMore: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insurance, thoughts, videos, questions };
