import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserStore } from '../models/index';

import { User } from '../types/index';

import { HttpException } from '../errors/HttpException';

import { BCRYPT_PASSWORD, TOKEN_SECRET } from '../utils/environment';

const pepper = BCRYPT_PASSWORD ?? 'secret password';
const token_secret = TOKEN_SECRET ?? 'top secret';

const store = new UserStore();

export const index = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await store.index();
		res.status(200).json({ users, nbHits: users.length });
	} catch (error) {
		next(error);
	}
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await store.show(req.params.id);
		if (!user) throw new HttpException(404, 'User not found');
		res.status(200).json(user);
	} catch (error) {
		next(error);
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
		role: req.body.role,
	};
	try {
		const newUser = await store.create(user);
		res.status(201).json(newUser);
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
		const deleted = await store.delete(req.params.id);
		if (!deleted) throw new HttpException(404, 'User not found');
		res.status(200).json(deleted);
	} catch (error) {
		next(error);
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
		role: req.body.role,
	};
	try {
		const updated = await store.update(user);
		if (!updated) throw new HttpException(404, 'User not found');
		res.status(201).json(updated);
	} catch (error) {
		next(error);
	}
};

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const username: string | undefined = req.body.username;
		if (!username) throw new HttpException(400, 'username must be provide');
		const password: string | undefined = req.body.password;
		if (!password) throw new HttpException(400, 'username must be provide');

		const user = await store.authenticate(username);
		if (!user) throw new HttpException(404, 'User not found');

		if (!bcrypt.compareSync(password + pepper, user.password))
			throw new HttpException(401, `Wrong User`);

		const { password: pas, ...rest }: User = user;
		const token = jwt.sign({ user: rest }, token_secret, {
			expiresIn: '1h',
		});

		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
};
