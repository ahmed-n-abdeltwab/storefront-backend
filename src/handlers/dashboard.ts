import { Request, Response, NextFunction } from 'express';

import { OrderStore } from '../models/order';

import { UserWithOrders } from '../types/dashboard';

import HttpException from '../errors/HttpException';

const store = new OrderStore();

export const userWithOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders: UserWithOrders[] = await store.userWithOrders(
			req.params.id
		);
		res.status(200).json({ orders, nbHits: orders.length });
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};
