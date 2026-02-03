import { Request, Response } from 'express';
import prisma from '../db';
import { createTodoSchema, updateTodoSchema } from '../validators/todoValidator';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        // 使用 Zod 驗證資料
        const validatedData = createTodoSchema.parse(req.body);

        const todo = await prisma.todo.create({
            data: { content: validatedData.content }
        });
        res.json(todo);
    } catch (error) {
        res.status(400).json({ error: 'Invalid input' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = updateTodoSchema.parse(req.body);

        const todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { isCompleted: validatedData.isCompleted }
        });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.todo.delete({
            where: { id: Number(id) }
        });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};
