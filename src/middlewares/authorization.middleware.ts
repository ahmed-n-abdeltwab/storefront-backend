import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import HttpException from '../errors/HttpException';

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'top secret';

export const authorization = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			next(new HttpException(400, 'the authorization Header is empty'));
			return;
		}
		const token = authorizationHeader.split(' ')[1];
		const decoded = jwt.verify(token, TOKEN_SECRET) as jwt.JwtPayload;
		const id = req.params.id || req.body.id;
		if (decoded.user.id !== parseInt(id)) {
			next(new HttpException(400, 'User id does not match!'));
			return;
		}
		next();
	} catch (err) {
		next(new HttpException(401, err as string));
	}
};
