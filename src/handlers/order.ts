import { Request, Response, NextFunction } from 'express';

import { OrderStore } from '../models/order';
import { Order } from '../types/order';
import HttpException from '../errors/HttpException';

const store = new OrderStore();

export const index = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders: Order[] = await store.index();
		res.json(orders);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order: Order = await store.show(req.body.id);
		res.json(order);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const order: Order = {
			product_id: req.body.product_id,
			quantity: req.body.quantity,
			user_id: req.body.user_id,
			status: 'active',
		};
		const newOrder: Order = await store.create(order);
		res.json(newOrder);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const destroy = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deleted: Order = await store.delete(req.body.id);
		res.json(deleted);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};
