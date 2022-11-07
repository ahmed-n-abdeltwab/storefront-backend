import { Request, Response, NextFunction } from 'express';

import { OrderStore } from '../models/index';

import { Order } from '../types/index';

import { HttpException } from '../errors/HttpException';

const store = new OrderStore();

export const index = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders: Order[] = await store.index();
		res.json({ orders, nbHits: orders.length });
	} catch (error) {
		next(error);
	}
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order: Order = await store.show(req.params.id);
		if (!order) throw new HttpException(404, 'Order not found');
		res.json(order);
	} catch (error) {
		next(error);
	}
};

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user_id: number | undefined = req.body.user_id;
		if (!user_id) throw new HttpException(400, 'User id is required');
		const order: Order = {
			user_id: user_id,
			completed: false,
		};
		const newOrder: Order = await store.create(order);
		res.status(201).json(newOrder);
	} catch (error) {
		next(error);
	}
};

export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user_id: number | undefined = req.body.user_id;
		const completed: boolean | undefined = req.body.completed;
		if (!user_id) throw new HttpException(400, 'User id is required');
		if (completed === undefined) throw new HttpException(400, 'completed is required');
		const order: Order = {
			id: parseInt(req.params.id),
			user_id: user_id,
			completed: completed,
		};

		const updated: Order = await store.update(order);
		if (!updated) throw new HttpException(404, 'Order not found');
		res.status(201).json(updated);
	} catch (error) {
		next(error);
	}
};

export const destroy = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deleted: Order = await store.delete(req.params.id);
		if (!deleted) throw new HttpException(404, 'Order not found');
		res.json(deleted);
	} catch (error) {
		next(error);
	}
};
