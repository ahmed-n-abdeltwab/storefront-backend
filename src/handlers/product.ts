import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Product, ProductStore } from '../models/product';

const store = new ProductStore();
const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'top secret';

const index = async (_req: Request, res: Response) => {
	const products = await store.index();
	res.json(products);
};

const show = async (_req: Request, res: Response) => {
	const product = await store.show(_req.body.id);
	res.json(product);
};

const create = async (req: Request, res: Response) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader)
			throw new Error('the authorization Header is empty');
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, TOKEN_SECRET);
	} catch (err) {
		res.status(401).json('Access denied, invalid token');
		return;
	}

	try {
		const product: Product = {
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
		};

		const newProduct = await store.create(product);
		res.json(newProduct);
	} catch (err) {
		res.status(400).json(err);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader)
			throw new Error('the authorization Header is empty');
		const token = authorizationHeader.split(' ')[1];
		const decoded = jwt.verify(token, TOKEN_SECRET) as jwt.JwtPayload;
		if (decoded.id !== req.body.id) {
			throw new Error('User id does not match!');
		}
	} catch (err) {
		res.status(401).json('Access denied, invalid token');
		return;
	}

	try {
		const deleted = await store.delete(req.body.id);
		res.json(deleted);
	} catch (error) {
		res.status(400);
		res.json({ error });
	}
};

const productsRoutes = (app: express.Application) => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', create);
	app.delete('/products', destroy);
};

export default productsRoutes;
