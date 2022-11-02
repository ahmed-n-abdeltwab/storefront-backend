// @ts-ignore
import Pool from '../database';

export type Product = {
	id?: Number;
	name: String;
	price: Number;
	category: String;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			// @ts-ignore
			const conn = await Pool.connect();
			const sql = 'SELECT * FROM Products';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Could not get products. Error: ${err}`);
		}
	}

	async show(id: string): Promise<Product> {
		try {
			const sql = 'SELECT * FROM Products WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find product ${id}. Error: ${err}`);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const sql =
				'INSERT INTO Products (name, price, category) VALUES($1, $2, $3) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [p.name, p.price, p.category]);

			const product = result.rows[0];

			conn.release();

			return product;
		} catch (err) {
			throw new Error(
				`Could not add new product ${p.name}. Error: ${err}`
			);
		}
	}

	async delete(id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM Products WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const product = result.rows[0];

			conn.release();

			return product;
		} catch (err) {
			throw new Error(`Could not delete product ${id}. Error: ${err}`);
		}
	}
}
