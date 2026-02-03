export type Todo = {
    id: number;
    content: string;
    isCompleted: boolean;
    createdAt: string;
};

export const api = {
    getTodos: async (): Promise<Todo[]> => {
        const res = await fetch('/api/todos');
        return res.json();
    },

    createTodo: async (content: string): Promise<Todo> => {
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
        return res.json();
    },

    toggleTodo: async (id: number, isCompleted: boolean): Promise<Todo> => {
        const res = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCompleted }),
        });
        return res.json();
    },

    deleteTodo: async (id: number): Promise<void> => {
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        });
    },
};
