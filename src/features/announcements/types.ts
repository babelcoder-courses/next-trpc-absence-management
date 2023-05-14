import { type RouterOutput } from '~/server/api/root';

export type Announcement = RouterOutput['announcement']['list'][number];
