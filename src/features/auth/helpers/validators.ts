import * as z from 'zod';

export const login = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const register = login.merge(
  z.object({
    name: z.string().min(1).max(20),
  }),
);
