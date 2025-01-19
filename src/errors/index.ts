import { InternalError } from '@/errors/internal-error';

export class ErrorFactory {
	static internalError(message: string) {
		return new InternalError(message);
	}
}
