import Pool from '../database';
import { SALT_ROUNDS, BCRYPT_PASSWORD } from '../utils/environment';
import bcrypt from 'bcrypt';

const saltRounds = SALT_ROUNDS ?? '10';
const pepper = BCRYPT_PASSWORD ?? 'secret password';

import { User } from '../types/index';

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
			throw new Error((error as Error).message);
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

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO Users (username, firstname, lastname, password, role) VALUES($1, $2, $3, $4, $5) RETURNING *';
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
				u.role,
			]);
			const user: User = result.rows[0];

			conn.release();

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async update(u: User): Promise<User> {
		try {
			const sql =
				'UPDATE Users SET username=($1), firstname=($2), lastname=($3), password=($4), role=($5) WHERE id=($6) RETURNING *';
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
				u.role,
				u.id,
			]);
			const user: User = result.rows[0];

			conn.release();

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

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	async authenticate(username: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM Users WHERE username=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [username]);

			const user: User = result.rows[0];

			conn.release();

			return user;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
}
