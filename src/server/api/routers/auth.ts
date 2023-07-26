import bcrypt from 'bcryptjs';
import { register } from '~/features/auth/helpers/validators';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  register: publicProcedure.input(register).mutation(async ({ input, ctx }) => {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = await ctx.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
      },
    });

    return user;
  }),
});
