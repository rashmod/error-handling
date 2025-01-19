import { todo } from '@/db/schema';
import { ErrorFactory } from '@/errors';
import { AppError } from '@/errors/app-error';
import { Result, err, ok } from '@/lib/result';
import { TodoRepository } from '@/todo/repository';

export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async createTodo(content: string): Promise<Result<typeof todo.$inferSelect, Error>> {
		const createdTodo = await this.todoRepository.createTodo(content);
		if (!createdTodo.ok) {
			if (createdTodo.error instanceof AppError) {
				return err(createdTodo.error);
			}
			console.log(createdTodo.error); // add logging for unknown errors
			return err(ErrorFactory.internalError('unknown error'));
		}

		if (!createdTodo.value) {
			return err(ErrorFactory.internalError('unknown error'));
		}

		return ok(createdTodo.value);
	}

	async getTodos(): Promise<Result<(typeof todo.$inferSelect)[], Error>> {
		const todos = await this.todoRepository.getTodos();
		if (!todos.ok) {
			if (todos.error instanceof AppError) {
				return err(todos.error);
			}
			console.log(todos.error);
			return err(ErrorFactory.internalError('unknown error'));
		}

		return ok(todos.value);
	}
}
