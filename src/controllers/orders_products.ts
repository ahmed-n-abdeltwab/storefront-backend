import { Request, Response, NextFunction } from 'express';

import { OrderStore } from '../models/order';

import { OrderProduct, CurrentOrders } from '../types/order';

import HttpException from '../errors/HttpException';

const store = new OrderStore();

export const indexProduct = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orderProduct: OrderProduct[] = await store.indexProduct();
		res.json({ orderProduct, nbHits: orderProduct.length });
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const showProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orderProduct: OrderProduct = await store.showProduct(
			req.params.id
		);
		res.json(orderProduct);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const order: OrderProduct = {
			order_id: req.body.order_id,
			product_id: req.body.product_id,
			quantity: req.body.quantity,
		};
		const newOrder: OrderProduct = await store.createProduct(order);
		res.json(newOrder);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const order: OrderProduct = {
		id: parseInt(req.params.id),
		order_id: req.body.order_id,
		product_id: req.body.product_id,
		quantity: req.body.quantity,
	};
	try {
		const updated: OrderProduct = await store.updateProduct(order);
		res.status(201).json(updated);
	} catch (error) {
		next(new HttpException(404, (error as Error).message));
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deleted: OrderProduct = await store.deleteProduct(req.params.id);
		res.json(deleted);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const currentOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const isCompleted: boolean = req.body?.isCompleted ?? false;
		const orders: CurrentOrders[] = await store.currentOrders(
			req.params.id,
			isCompleted
		);
		res.json({ orders, nbHits: orders.length });
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};
