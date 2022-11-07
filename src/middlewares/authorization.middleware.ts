import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errors/HttpException';

export const authorization = (
	_req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		if (res.locals.decoded.user.role !== 'admin') {
			throw new HttpException(400, 'User not authorization');
		}
		next();
	} catch (error) {
		next(error);
	}
};
