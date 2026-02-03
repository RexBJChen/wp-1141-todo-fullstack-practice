import { z } from 'zod';

export const createTodoSchema = z.object({
    content: z.string().min(1, "Content is required"),
});

export const updateTodoSchema = z.object({
    isCompleted: z.boolean(),
});
