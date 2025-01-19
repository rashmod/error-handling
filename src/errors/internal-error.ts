import { AppError } from '@/errors/app-error';

export class InternalError extends AppError {
	constructor(message: string) {
		super(message);
		this.name = 'InternalError';
	}
}
