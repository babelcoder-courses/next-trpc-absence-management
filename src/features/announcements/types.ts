import { type RouterOutput } from '~/server/api/root';

export type AnnouncementItem = RouterOutput['announcement']['list'][number];
export type AnnouncementDetails = RouterOutput['announcement']['bySlug'];
