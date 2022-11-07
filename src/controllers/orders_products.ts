import { Request, Response, NextFunction } from 'express';

import { OrderStore } from '../models/index';

import { OrderProduct, CurrentOrders } from '../types/index';

import { HttpException } from '../errors/HttpException';

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
		next(error);
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
		if (!orderProduct)
			throw new HttpException(404, 'Order Product not found');
		res.json(orderProduct);
	} catch (error) {
		next(error);
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
		next(error);
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
		if (!updated) throw new HttpException(404, 'Order Product not found');

		res.status(201).json(updated);
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deleted: OrderProduct = await store.deleteProduct(req.params.id);

		if (!deleted) throw new HttpException(404, 'Order product not found');

		res.json(deleted);
	} catch (error) {
		next(error);
	}
};

export const currentOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const completed: boolean = req.body?.completed ?? false;
		const orders: CurrentOrders[] = await store.currentOrders(
			req.params.id,
			completed
		);
		res.json({ orders, nbHits: orders.length });
	} catch (error) {
		next(error);
	}
};
