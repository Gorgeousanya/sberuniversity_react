import { z } from 'zod';
import type { validationSchema } from './validator';

export type FormValues = z.infer<typeof validationSchema>;
