import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import * as validators from '~/features/leaves/helpers/validators';
import * as z from 'zod';
import { TRPCError } from '@trpc/server';
import { setTimeout } from 'timers/promises';

export const leaveRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    await setTimeout(5000);
    const leaves = await ctx.prisma.leave.findMany({
      select: {
        id: true,
        reason: true,
        leaveDate: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return leaves;
  }),
  byId: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const leave = await ctx.prisma.leave.findUnique({
      where: { id: input },
      select: {
        id: true,
        leaveDate: true,
        reason: true,
      },
    });

    if (!leave) throw new TRPCError({ code: 'NOT_FOUND' });

    return leave;
  }),
  add: publicProcedure
    .input(validators.add)
    .mutation(async ({ input, ctx }) => {
      const leave = await ctx.prisma.leave.create({
        data: {
          ...input,
          userId: 1,
        },
      });

      return leave;
    }),
  update: publicProcedure
    .input(validators.update)
    .mutation(async ({ input, ctx }) => {
      const leave = await ctx.prisma.leave.update({
        where: { id: input.id },
        data: input.data,
      });

      return leave;
    }),
});
