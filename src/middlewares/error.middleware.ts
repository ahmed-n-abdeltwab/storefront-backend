import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';

function errorMiddleware(
	error: HttpException,
	_request: Request,
	response: Response,
	_next: NextFunction
): void {
	const status:number = error.status ?? 500;
	const message:string = error.message ?? 'Something went wrong';
	response.status(status).send({
		status,
		message,
	});
	return;
}

export default errorMiddleware;
