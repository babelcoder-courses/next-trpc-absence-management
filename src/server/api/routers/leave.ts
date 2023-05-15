import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const leaveRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
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
});
