import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Order, OrderStore } from '../models/order';

const store = new OrderStore();
const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'top secret';

const index = async (_req: Request, res: Response) => {
	const orders = await store.index();
	res.json(orders);
};

const show = async (_req: Request, res: Response) => {
	const order = await store.show(_req.body.id);
	res.json(order);
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
		const order: Order = {
			product_id: req.body.name,
			quantity: req.body.price,
			user_id: req.body.category,
			status: 'active',
		};

		const newOrder = await store.create(order);
		res.json(newOrder);
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
		res.status(400).json({ error });
	}
};

const ordersRoutes = (app: express.Application) => {
	app.get('/orders', index);
	app.get('/orders/:id', show);
	app.post('/orders', create);
	app.delete('/orders', destroy);
};

export default ordersRoutes;
