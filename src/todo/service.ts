import { todo } from '@/db/schema';
import { ErrorFactory } from '@/errors';
import { Result, err, ok } from '@/lib/result';
import { TodoRepository } from '@/todo/repository';

export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async createTodo(content: string): Promise<Result<typeof todo.$inferSelect, Error>> {
		const createdTodo = await this.todoRepository.createTodo(content);
		if (!createdTodo.ok) {
			return err(createdTodo.error);
		}

		if (!createdTodo.value) {
			return err(ErrorFactory.internalError('unknown error'));
		}

		return ok(createdTodo.value);
	}

	async getTodos(): Promise<Result<(typeof todo.$inferSelect)[], Error>> {
		const todos = await this.todoRepository.getTodos();
		if (!todos.ok) {
			return err(todos.error);
		}

		return ok(todos.value);
	}
}
