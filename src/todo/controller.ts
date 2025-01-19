import express from 'express';

import { TodoService } from '@/todo/service';

export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	createTodo = async (req: express.Request, res: express.Response) => {
		const { content }: { content: string } = req.body;

		const todo = await this.todoService.createTodo(content);
		if (!todo.ok) {
			res.status(500).json({ error: todo.error.message });
			return;
		}

		res.status(201).json({ todo: todo.value });
		return;
	};

	getTodos = async (_req: express.Request, res: express.Response) => {
		const todos = await this.todoService.getTodos();
		if (!todos.ok) {
			res.status(500).json({ error: todos.error.message });
			return;
		}

		res.status(200).json({ todos: todos.value });
		return;
	};
}
