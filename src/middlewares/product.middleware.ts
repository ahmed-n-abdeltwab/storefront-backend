import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errors/HttpException';

export const InputProductValidation = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const name: string = req.body.name;
		const price: string = req.body.price;
		const category: string = req.body.category;
		const description: string | undefined = req.body.description;
		if ([name, price, category, description].includes(undefined))
			throw new HttpException(
				400,
				'Please make sure to provide name, price, category and description'
			);
		next();
	} catch (error) {
		next(error);
	}
};
