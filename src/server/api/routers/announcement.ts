import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { slugify } from '~/features/shared/helpers/slugify';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

interface Announcement {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Title#1',
    slug: 'slug-1',
    excerpt: 'Excerpt#1',
    content: 'Content#1',
  },
  {
    id: 2,
    title: 'Title#2',
    slug: 'slug-2',
    excerpt: 'Excerpt#2',
    content: 'Content#2',
  },
  {
    id: 3,
    title: 'Title#3',
    slug: 'slug-3',
    excerpt: 'Excerpt#3',
    content: 'Content#3',
  },
  {
    id: 4,
    title: 'Title#4',
    slug: 'slug-4',
    excerpt: 'Excerpt#4',
    content: 'Content#4',
  },
  {
    id: 5,
    title: 'Title#5',
    slug: 'slug-5',
    excerpt: 'Excerpt#5',
    content: 'Content#5',
  },
  {
    id: 6,
    title: 'Title#6',
    slug: 'slug-6',
    excerpt: 'Excerpt#6',
    content: 'Content#6',
  },
];

export const announcementRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return announcements;
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return announcements.find((announcement) => announcement.id === input);
  }),
  bySlug: publicProcedure.input(z.string()).query(({ input }) => {
    return announcements.find((announcement) => announcement.slug === input);
  }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const announcement = {
        id: announcements.length + 1,
        slug: slugify(input.title),
        ...input,
      };
      announcements.push(announcement);

      return announcement;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z
          .object({
            title: z.string(),
            excerpt: z.string(),
            content: z.string(),
          })
          .partial(),
      }),
    )
    .mutation(({ input }) => {
      const { id, data } = input;
      const announcement = announcements.find(
        (announcement) => announcement.id === id,
      );

      if (!announcement) throw new TRPCError({ code: 'NOT_FOUND' });

      if (data.title) {
        announcement.title = data.title;
        announcement.slug = slugify(data.title);
      }
      if (data.excerpt) announcement.excerpt = data.excerpt;
      if (data.content) announcement.content = data.content;

      return announcement;
    }),
  remove: publicProcedure.input(z.number()).mutation(({ input }) => {
    const index = announcements.findIndex(
      (announcement) => announcement.id === input,
    );
    announcements.splice(index, 1);
  }),
});
