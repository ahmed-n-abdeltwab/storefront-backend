import { Request, Response, NextFunction } from 'express';

import { ProductStore } from '../models/product';
import { Product } from '../types/product';
import HttpException from '../errors/HttpException';

const store = new ProductStore();

export const index = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await store.index();
		res.json(products);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await store.show(req.body.id);
		res.json(product);
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
		const product: Product = {
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
		};

		const newProduct = await store.create(product);
		res.json(newProduct);
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
		const deleted = await store.delete(req.body.id);
		res.json(deleted);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};
