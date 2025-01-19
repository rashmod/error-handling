import { db } from '@/db';
import { todo } from '@/db/schema';
import { ErrorFactory } from '@/errors';
import { Result, err, ok } from '@/lib/result';

export class TodoRepository {
	async createTodo(content: string): Promise<Result<typeof todo.$inferSelect | undefined, Error>> {
		try {
			const [result] = await db.insert(todo).values({ content }).returning();

			return ok(result);
		} catch (error) {
			if (error instanceof Error) {
				return err(error);
			}
			return err(ErrorFactory.internalError('unknown error'));
		}
	}

	async getTodos(): Promise<Result<(typeof todo.$inferSelect)[], Error>> {
		try {
			const todos = await db.select().from(todo);

			return ok(todos);
		} catch (error) {
			if (error instanceof Error) {
				return err(error);
			}
			return err(ErrorFactory.internalError('unknown error'));
		}
	}
}
