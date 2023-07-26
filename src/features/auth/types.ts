import type * as z from 'zod';
import { type register, type login, type profile } from './helpers/validators';

export type LoginInput = z.infer<typeof login>;

export type RegisterInput = z.infer<typeof register>;

export type ProfileInput = z.infer<typeof profile>;
