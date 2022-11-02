import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';

export const authorization = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const id = req.params.id ?? req.body.id;
		if (res.locals.decoded.user.id !== parseInt(id)) {
			next(new HttpException(400, 'User not authorization'));
			return;
		}
		next();
	} catch (err) {
		next(new HttpException(401, err as string));
	}
};
