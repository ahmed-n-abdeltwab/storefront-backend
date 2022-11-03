import { Request, Response, NextFunction } from 'express';

import { DashboardQueries } from '../models/dashboard';

import { OrdersInUser, ProductsInOrders } from '../types/dashboard';

import HttpException from '../errors/HttpException';

const dashboard = new DashboardQueries();

export const productsInOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products: ProductsInOrders[] = await dashboard.productsInOrders(
			req.params.id
		);
		res.status(200).json({ products, nbHits: products.length });
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const ordersInUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders: OrdersInUser[] = await dashboard.ordersInUser(
			req.params.id
		);
		res.status(200).json({ orders, nbHits: orders.length });
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};
