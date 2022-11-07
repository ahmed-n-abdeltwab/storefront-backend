import { Request, Response, NextFunction } from 'express';

import { ProductStore } from '../models/index';
import { Product } from '../types/index';
import { HttpException } from '../errors/HttpException';

const store = new ProductStore();

export const index = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products: Product[] = await store.index();
		res.json({ products, nbHits: products.length });
	} catch (error) {
		next(error);
	}
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product: Product = await store.show(req.params.id);
		if (!product) throw new HttpException(404, 'Product not found');
		res.status(200).json(product);
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
		const product: Product = {
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			description: req.body.category,
		};
		const newProduct: Product = await store.create(product);
		res.status(201).json(newProduct);
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
		const product: Product = {
			id: parseInt(req.params.id),
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description,
		};
		const updated: Product = await store.update(product);
		if (!updated) throw new HttpException(404, 'Product not found');
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
		const deleted: Product = await store.delete(req.params.id);
		if (!deleted) throw new Error('Product not found');
		res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
};
