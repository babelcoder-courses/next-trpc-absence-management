import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

interface Leave {
  id: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  leaveDate: string;
}

const leaves: Leave[] = [
  {
    id: 1,
    reason: 'Reason#1',
    status: 'PENDING',
    leaveDate: new Date().toDateString(),
  },
  {
    id: 2,
    reason: 'Reason#2',
    status: 'APPROVED',
    leaveDate: new Date().toDateString(),
  },
  {
    id: 3,
    reason: 'Reason#3',
    status: 'REJECTED',
    leaveDate: new Date().toDateString(),
  },
];

export const leaveRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return leaves;
  }),
});
