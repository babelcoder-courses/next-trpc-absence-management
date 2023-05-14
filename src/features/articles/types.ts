import { type RouterOutput } from '~/server/api/root';

export type Article = RouterOutput['article']['list'][number];
