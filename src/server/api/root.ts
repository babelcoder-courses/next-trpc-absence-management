import { createTRPCRouter } from '~/server/api/trpc';
import { articleRouter } from '~/server/api/routers/article';
import { leaveRouter } from '~/server/api/routers/leave';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  article: articleRouter,
  leave: leaveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
