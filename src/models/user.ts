import Pool from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS ?? '10';
const pepper = process.env.BCRYPT_PASSWORD;

import { User } from '../types/user';

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const sql = 'SELECT * FROM Users';

			//@ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql);

			const users: User[] = result.rows;

			conn.release();

			return users;
		} catch (error) {
			throw new Error(`Unable to get users: ${(error as Error).message}`);
		}
	}

	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM Users WHERE id=($1)';
			//@ts-ignoreX$
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const user: User = result.rows[0];

			conn.release();

			if (!user) throw new Error('User not found');

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO Users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const hash = bcrypt.hashSync(
				u.password + pepper,
				parseInt(saltRounds)
			);

			const result = await conn.query(sql, [
				u.username,
				u.firstname,
				u.lastname,
				hash,
			]);
			const user: User = result.rows[0];

			conn.release();

			return user;
		} catch (error) {
			throw new Error(
				`Unable to create user (${u.username}): ${
					(error as Error).message
				}`
			);
		}
	}
	async update(u: User): Promise<User> {
		try {
			const sql =
				'UPDATE Users SET username=($1), firstname=($2), lastname=($3), password=($4) WHERE id=($5) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const hash = bcrypt.hashSync(
				u.password + pepper,
				parseInt(saltRounds)
			);

			const result = await conn.query(sql, [
				u.username,
				u.firstname,
				u.lastname,
				hash,
				u.id,
			]);
			const user: User = result.rows[0];

			conn.release();

			if (!user) throw new Error('User not found');

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async delete(id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM Users WHERE id=($1) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const user: User = result.rows[0];

			conn.release();

			if (!user) throw new Error('User not found');

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	async authenticate(id: string, password: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM Users WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const user: User = result.rows[0];

			conn.release();

			if (!user) throw new Error('User not found');

			if (!bcrypt.compareSync(password + pepper, user.password))
				throw new Error(`Wrong User`);

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
}
