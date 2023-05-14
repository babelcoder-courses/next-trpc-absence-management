import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { slugify } from '~/features/shared/helpers/slugify';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

// frontend => api.article.[list, byId, update, delete, add]
// backend
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Title#1',
    slug: 'slug-1',
    excerpt: 'Excerpt#1',
    content: 'Content#1',
    image: '/uploads/photo-1678382154583-b45867cfc331.avif',
  },
  {
    id: 2,
    title: 'Title#2',
    slug: 'slug-2',
    excerpt: 'Excerpt#2',
    content: 'Content#2',
    image: '/uploads/photo-1678382154583-b45867cfc331.avif',
  },
  {
    id: 3,
    title: 'Title#3',
    slug: 'slug-3',
    excerpt: 'Excerpt#3',
    content: 'Content#3',
    image: '/uploads/photo-1678382154583-b45867cfc331.avif',
  },
  {
    id: 4,
    title: 'Title#4',
    slug: 'slug-4',
    excerpt: 'Excerpt#4',
    content: 'Content#4',
    image: '/uploads/photo-1678382154583-b45867cfc331.avif',
  },
  {
    id: 5,
    title: 'Title#5',
    slug: 'slug-5',
    excerpt: 'Excerpt#5',
    content: 'Content#5',
    image: '/uploads/photo-1678382154583-b45867cfc331.avif',
  },
  {
    id: 6,
    title: 'Title#6',
    slug: 'slug-6',
    excerpt: 'Excerpt#6',
    content: 'Content#6',
    image: '/uploads/photo-1678382154583-b45867cfc331.avif',
  },
];

export const articleRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return articles;
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return articles.find((article) => article.id === input);
  }),
  bySlug: publicProcedure.input(z.string()).query(({ input }) => {
    return articles.find((article) => article.slug === input);
  }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        image: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const article = {
        id: articles.length + 1,
        slug: slugify(input.title),
        ...input,
      };
      articles.push(article);

      return article;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z
          .object({
            title: z.string(),
            image: z.string(),
            excerpt: z.string(),
            content: z.string(),
          })
          .partial(),
      }),
    )
    .mutation(({ input }) => {
      const { id, data } = input;
      const article = articles.find((article) => article.id === id);

      if (!article) throw new TRPCError({ code: 'NOT_FOUND' });

      if (data.title) {
        article.title = data.title;
        article.slug = slugify(data.title);
      }
      if (data.excerpt) article.excerpt = data.excerpt;
      if (data.content) article.content = data.content;

      return article;
    }),
  remove: publicProcedure.input(z.number()).mutation(({ input }) => {
    const index = articles.findIndex((article) => article.id === input);
    articles.splice(index, 1);
  }),
});
