import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { ApiResponse } from '@/http/api-response';
import handleApiResponse from '@/http/handle-api-response';
import { safe } from '@/lib/safe';
import { TodoService } from '@/todo/service';

export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	createTodo = async (req: express.Request, res: express.Response) => {
		const { content }: { content: string } = req.body;

		const parsedContent = safe(() => JSON.parse(content));

		if (!parsedContent.ok) {
			const response = ApiResponse.failure({
				message: 'failed to parse content',
				statusCode: StatusCodes.BAD_REQUEST,
				error: parsedContent.error,
			});
			handleApiResponse(res, response);
			return;
		}

		const todo = await this.todoService.createTodo(parsedContent.value);
		if (!todo.ok) {
			const response = ApiResponse.failure({
				message: 'failed to create todo',
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				error: todo.error,
			});
			handleApiResponse(res, response);
			return;
		}

		const response = ApiResponse.success({
			message: 'todo created successfully',
			statusCode: StatusCodes.CREATED,
			data: todo.value,
		});
		handleApiResponse(res, response);
		return;
	};

	getTodos = async (_req: express.Request, res: express.Response) => {
		const todos = await this.todoService.getTodos();
		if (!todos.ok) {
			const response = ApiResponse.failure({
				message: 'failed to get todos',
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				error: todos.error,
			});
			handleApiResponse(res, response);
			return;
		}

		const response = ApiResponse.success({
			message: 'todos fetched successfully',
			statusCode: StatusCodes.OK,
			data: todos.value,
		});
		handleApiResponse(res, response);
		return;
	};
}
