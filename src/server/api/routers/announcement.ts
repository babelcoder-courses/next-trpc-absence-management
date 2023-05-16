import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { slugify } from '~/features/shared/helpers/slugify';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const announcementRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const announcements = await ctx.prisma.announcement.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return announcements;
  }),
  byId: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const announcement = await ctx.prisma.announcement.findUnique({
      where: { id: input },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    if (!announcement) throw new TRPCError({ code: 'NOT_FOUND' });

    return announcement;
  }),
  bySlug: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const announcement = await ctx.prisma.announcement.findUnique({
      where: { slug: input },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    if (!announcement) throw new TRPCError({ code: 'NOT_FOUND' });

    return announcement;
  }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const announcement = await ctx.prisma.announcement.create({
        data: { ...input, slug: slugify(input.title), userId: 1 },
      });

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
    .mutation(async ({ input, ctx }) => {
      const announcement = await ctx.prisma.announcement.update({
        where: { id: input.id },
        data: input.data.title
          ? { ...input, slug: slugify(input.data.title) }
          : input.data,
      });

      return announcement;
    }),
  remove: publicProcedure.input(z.number()).mutation(async ({ input, ctx }) => {
    await ctx.prisma.announcement.delete({
      where: { id: input },
    });
  }),
});
