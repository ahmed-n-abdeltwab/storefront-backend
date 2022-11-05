// @ts-ignore
import Pool from '../database';

import { Order } from '../types/order';
import { UserWithOrders } from '../types/dashboard';
export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const sql = 'SELECT * FROM Orders';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql);

			const orders: Order[] = result.rows;

			conn.release();

			return orders;
		} catch (error) {
			throw new Error(
				`Could not get orders. Error: ${(error as Error).message}`
			);
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

			if (!order) throw new Error('Order not found');

			return order;
		} catch (error) {
			throw new Error((error as Error).message);
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
				`Could not add new order with product ${o.product_id}. Error: ${
					(error as Error).message
				}`
			);
		}
	}
	async update(o: Order): Promise<Order> {
		try {
			const sql =
				'UPDATE Orders SET product_id=($1), quantity=($2), user_id=($3), status=($4) WHERE id=($5) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [
				o.product_id,
				o.quantity,
				o.user_id,
				o.status,
				o.id,
			]);
			const order: Order = result.rows[0];

			conn.release();

			if (!order) throw new Error('Order not found');

			return order;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM Orders WHERE id=($1) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const order: Order = result.rows[0];

			conn.release();

			if (!order) throw new Error('Order not found');

			return order;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async userWithOrders(id: string, limits:number = 1): Promise<UserWithOrders[]> {
		try {
			//@ts-ignore
			const conn = await Pool.connect();
			const sql = `SELECT p.name, o.id, o.quantity, o.status
            FROM Orders o INNER JOIN Products p
            ON o.product_id = p.id WHERE o.user_id = ($1) ORDER BY o.user_id DESC LIMIT ($2)`;

			const result = await conn.query(sql, [id, limits]);

			conn.release();

			const orders: UserWithOrders[] = result.rows;

			return orders;
		} catch (error) {
			throw new Error(`unable get Orders with user: ${error}`);
		}
	}
	async userWithActiveOrders(id: string): Promise<UserWithOrders[]> {
		try {
			//@ts-ignore
			const conn = await Pool.connect();
			const sql = `SELECT p.name, o.id, o.quantity, o.status
            FROM Orders o INNER JOIN Products p
            ON o.product_id = p.id WHERE o.user_id = ($1) AND o.status like "active" ORDER BY o.user_id DESC LIMIT 1`;

			const result = await conn.query(sql, [id]);

			conn.release();

			const orders: UserWithOrders[] = result.rows;

			return orders;
		} catch (error) {
			throw new Error(`unable get The active Orders with user: ${error}`);
		}
	}
}
