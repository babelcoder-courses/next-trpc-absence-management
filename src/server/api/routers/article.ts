import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { slugify } from '~/features/shared/helpers/slugify';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const articleRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const articles = await ctx.prisma.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return articles;
  }),
  byId: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const article = await ctx.prisma.article.findUnique({
      where: { id: input },
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
      },
    });

    return article;
  }),
  bySlug: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const article = await ctx.prisma.article.findUnique({
      where: { slug: input },
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
      },
    });

    if (!article) throw new TRPCError({ code: 'NOT_FOUND' });

    return article;
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
    .mutation(async ({ input, ctx }) => {
      const article = await ctx.prisma.article.create({
        data: {
          ...input,
          slug: slugify(input.title),
          userId: 1,
        },
      });

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
    .mutation(async ({ input, ctx }) => {
      const article = await ctx.prisma.article.update({
        where: { id: input.id },
        data: input.data.title
          ? { ...input.data, slug: slugify(input.data.title) }
          : input.data,
      });

      return article;
    }),
  remove: publicProcedure.input(z.number()).mutation(async ({ input, ctx }) => {
    await ctx.prisma.article.delete({
      where: { id: input },
    });
  }),
});
