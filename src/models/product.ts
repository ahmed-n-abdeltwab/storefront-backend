// @ts-ignore
import Pool from '../database';

import { Product } from '../types/product';

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const sql = 'SELECT * FROM Products';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql);

			const products: Product[] = result.rows;

			conn.release();

			return products;
		} catch (error) {
			throw new Error(
				`Could not get products. Error: ${(error as Error).message}`
			);
		}
	}

	async show(id: string): Promise<Product> {
		try {
			const sql = 'SELECT * FROM Products WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const product: Product = result.rows[0];

			conn.release();

			if (!product) throw new Error('Product not found');

			return product;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const sql =
				'INSERT INTO Products (name, price, category) VALUES($1, $2, $3) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [p.name, p.price, p.category]);

			const product: Product = result.rows[0];

			conn.release();

			return product;
		} catch (error) {
			throw new Error(
				`Could not add new product ${p.name}. Error: ${
					(error as Error).message
				}`
			);
		}
	}

	async delete(id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM Products WHERE id=($1) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const product: Product = result.rows[0];

			conn.release();

			if (!product) throw new Error('Product not found');

			return product;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
}
