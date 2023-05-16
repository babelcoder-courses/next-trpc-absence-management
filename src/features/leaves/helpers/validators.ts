import * as z from 'zod';

export const add = z.object({
  leaveDate: z.string().datetime(),
  reason: z.string().min(1),
});

export const updateForm = add.partial();

export const update = z.object({
  id: z.number(),
  data: updateForm,
});
