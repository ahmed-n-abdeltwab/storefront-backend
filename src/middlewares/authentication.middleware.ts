import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import HttpException from '../errors/HttpException';

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'top secret';

export const authentication = (
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
		const token: string = authorizationHeader.split(' ')[1] ?? '';
		const decoded: string | jwt.JwtPayload = jwt.verify(
			token,
			TOKEN_SECRET
		);
		res.locals.decoded = decoded;
		next();
	} catch (err) {
		next(new HttpException(401, 'Access denied, invalid token'));
	}
};
