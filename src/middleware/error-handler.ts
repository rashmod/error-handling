import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '@/errors/app-error';
import { ApiResponse } from '@/http/api-response';
import handleApiResponse from '@/http/handle-api-response';

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
	if (error instanceof AppError) {
		const response = ApiResponse.failure({
			statusCode: error.statusCode,
			message: error.message,
			error: {
				...error,
				stack: error.stack,
			},
		});
		handleApiResponse(res, response);
	} else {
		const response = ApiResponse.failure({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: 'Internal Server Error',
			error: {
				...error,
				stack: error.stack,
			},
		});
		handleApiResponse(res, response);
	}
}
