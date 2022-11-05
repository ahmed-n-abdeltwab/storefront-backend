import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';

export const authorization = (
	_req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		if (res.locals.decoded.user.role !== 'admin') {
			next(new HttpException(400, 'User not authorization'));
			return;
		}
		next();
	} catch (err) {
		next(new HttpException(401, err as string));
	}
};
