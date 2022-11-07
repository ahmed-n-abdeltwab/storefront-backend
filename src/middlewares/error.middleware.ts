import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errors/HttpException';

function errorMiddleware(
	error: HttpException | Error,
	_request: Request,
	response: Response,
	_next: NextFunction
): void {
	if (error instanceof HttpException) {
		response.status(error.status).send(error.message);
		return;
	}
	response.status(500).send(error.message);
	return;
}

export default errorMiddleware;
