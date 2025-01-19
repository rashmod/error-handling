import { StatusCodes } from 'http-status-codes';

import { AppError } from '@/errors/app-error';

export class InternalError extends AppError {
	constructor(message: string) {
		super(StatusCodes.INTERNAL_SERVER_ERROR, message);
		this.name = 'InternalError';
	}
}
