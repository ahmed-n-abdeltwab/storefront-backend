import Pool from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS ?? '10';
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
	id?: number;
	username: string;
	firstname: string;
	lastname: string;
	password: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		try {
			//@ts-ignore
			const conn = await Pool.connect();
			const sql = 'SELECT * FROM Users';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`unable get users: ${err}`);
		}
	}

	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM Users WHERE id=($1)';
			//@ts-ignoreX$
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);
			const user = result.rows[0];
			conn.release();
			if (!user) throw new Error('User not found');
			return user;
		} catch (err) {
			throw new Error(`unable show user ${id}: ${err}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			// @ts-ignore
			const conn = await Pool.connect();
			const sql =
				'INSERT INTO Users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *';

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
			const user = result.rows[0];

			conn.release();

			return user;
		} catch (err) {
			throw new Error(`unable create user (${u.username}): ${err}`);
		}
	}
	async update(u: User): Promise<User> {
		try {
			// @ts-ignore
			const conn = await Pool.connect();
			const sql =
				'UPDATE Users SET username=($1), firstname=($2), lastname=($3), password=($4) WHERE id=($5) RETURNING *';

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

			return user;
		} catch (err) {
			throw new Error(`unable create user (${u.username}): ${err}`);
		}
	}
	async delete(id: string): Promise<User> {
		try {
			const conn = await Pool.connect();
			const sql = 'DELETE FROM Users WHERE id=($1) RETURNING *';

			const result = await conn.query(sql, [id]);

			const user: User = result.rows[0];

			conn.release();

			return user;
		} catch (err) {
			throw new Error(`unable delete user (${id}): ${err}`);
		}
	}

	async authenticate(id: string, password: string): Promise<User> {
		const conn = await Pool.connect();
		const sql = 'SELECT * FROM Users WHERE id=($1)';

		const result = await conn.query(sql, [id]);
		if (!result.rows.length) throw new Error(`not found user (${id})`);
		const user = result.rows[0];

		if (!bcrypt.compareSync(password + pepper, user.password))
			throw new Error(`wrong user (${id})`);

		return user;
	}
}
