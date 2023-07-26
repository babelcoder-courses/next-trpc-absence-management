import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import * as validators from '~/features/leaves/helpers/validators';
import * as z from 'zod';
import { TRPCError } from '@trpc/server';

export const leaveRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const leaves = await ctx.prisma.leave.findMany({
      where: {
        userId: +ctx.session.user.id,
      },
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
  byId: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
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
  add: protectedProcedure
    .input(validators.add)
    .mutation(async ({ input, ctx }) => {
      const leave = await ctx.prisma.leave.create({
        data: {
          ...input,
          userId: +ctx.session.user.id,
        },
      });

      return leave;
    }),
  update: protectedProcedure
    .input(validators.update)
    .mutation(async ({ input, ctx }) => {
      const existingLeave = await ctx.prisma.leave.findUnique({
        where: { id: input.id },
      });

      // ABAC => Attribute-Based Access Control
      if (existingLeave?.userId !== +ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const leave = await ctx.prisma.leave.update({
        where: { id: input.id },
        data: input.data,
      });

      return leave;
    }),
});
