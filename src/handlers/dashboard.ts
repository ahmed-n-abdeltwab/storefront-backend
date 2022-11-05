import { Request, Response, NextFunction } from 'express';

import { OrderStore } from '../models/order';

import { UserWithOrders } from '../types/dashboard';

import HttpException from '../errors/HttpException';

const store = new OrderStore();

export const userWithOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders: UserWithOrders[] = await store.userWithOrder(
			req.params.id
		);
		res.status(200).json({ orders, nbHits: orders.length });
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const userWithActiveOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders: UserWithOrders[] = await store.userWithActiveOrders(
			req.params.id
		);
		res.status(200).json({ orders, nbHits: orders.length });
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};
