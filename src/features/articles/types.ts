import { type RouterOutput } from '~/server/api/root';

export type ArticleItem = RouterOutput['article']['list'][number];
export type ArticleDetails = RouterOutput['article']['bySlug'];
