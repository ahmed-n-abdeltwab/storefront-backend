// @ts-ignore
import Pool from '../database';

import { Order } from '../types/order';

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			// @ts-ignore
			const conn = await Pool.connect();
			const sql = 'SELECT * FROM Orders';

			const result = await conn.query(sql);
			const orders: Order[] = result.rows;
			conn.release();

			return orders;
		} catch (error) {
			throw new Error(`Could not get orders. Error: ${error}`);
		}
	}

	async show(id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM Orders WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const order: Order = result.rows[0];

			conn.release();

			return order;
		} catch (error) {
			throw new Error(`Could not find order ${id}. Error: ${error}`);
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO Orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [
				o.product_id,
				o.quantity,
				o.user_id,
				o.status,
			]);

			const order: Order = result.rows[0];

			conn.release();

			return order;
		} catch (error) {
			throw new Error(
				`Could not add new order with product ${o.product_id}. Error: ${error}`
			);
		}
	}

	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM Orders WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const order: Order = result.rows[0];

			conn.release();

			return order;
		} catch (error) {
			throw new Error(`Could not delete order ${id}. Error: ${error}`);
		}
	}
}
