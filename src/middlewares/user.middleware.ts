import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errors/HttpException';

export const InputUserValidation = (
	req: Request,
	_res: Response,
	next: NextFunction
): void => {
	try {
		const username: string = req.body.username;
		const firstname: string = req.body.firstname;
		const lastname: string = req.body.lastname;
		const password: string | undefined = req.body.password;
		const role: string | undefined = req.body.role;
		if ([username, password, role].includes(undefined))
			throw new HttpException(
				400,
				'Please make sure to provide username, password and role'
			);
		next();
	} catch (error) {
		next(error);
	}
};
