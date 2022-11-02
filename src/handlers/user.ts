import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserStore } from '../models/user';
import { User } from '../types/user';
import HttpException from '../errors/HttpException';

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'top secret';

const store = new UserStore();

export const index = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await store.index();
		res.status(200).json(users);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await store.show(req.params.id);
		
		res.status(200).json(user);
	} catch (error) {
		next(new HttpException(404, (error as Error).message));
	}
};

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user: User = {
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		password: req.body.password,
	};
	try {
		const newUser = await store.create(user);
		const { password, ...rest }: User = newUser;
		const token = jwt.sign({ user: rest }, TOKEN_SECRET);
		res.status(201).json(token);
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
		const deleted = await store.delete(req.params.id);
		res.json(deleted);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};
export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user: User = {
		id: parseInt(req.params.id),
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		password: req.body.password,
	};
	try {
		const updated = await store.update(user);
		res.status(201).json(updated);
	} catch (error) {
		next(new HttpException(400, (error as Error).message));
	}
};

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await store.authenticate(req.body.id, req.body.password);
		const { password, ...rest }: User = user;
		const token = jwt.sign({ user: rest }, TOKEN_SECRET);
		res.json(token);
	} catch (error) {
		next(new HttpException(401, (error as Error).message));
	}
};
