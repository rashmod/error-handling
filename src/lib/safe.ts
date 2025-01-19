import { Result, err, ok } from '@/lib/result';

export function safe<T>(promiseOrFunc: Promise<T>): Promise<Result<T, Error>>;
export function safe<T>(promiseOrFunc: () => T): Result<T, Error>;

export function safe<T>(promiseOrFunc: Promise<T> | (() => T)): Promise<Result<T, Error>> | Result<T, Error> {
	if (promiseOrFunc instanceof Promise) {
		return safeAsync(promiseOrFunc);
	}
	return safeSync(promiseOrFunc);
}

async function safeAsync<T>(promise: Promise<T>): Promise<Result<T, Error>> {
	try {
		const result = await promise;
		return ok(result);
	} catch (error) {
		if (error instanceof Error) {
			return err(error);
		}
		return err(new Error(String(error)));
	}
}

function safeSync<T>(func: () => T): Result<T, Error> {
	try {
		const result = func();
		return ok(result);
	} catch (error) {
		if (error instanceof Error) {
			return err(error);
		}
		return err(new Error(String(error)));
	}
}
