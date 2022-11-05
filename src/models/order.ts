// @ts-ignore
import Pool from '../database';

import { Order, CurrentOrders, OrderProduct } from '../types/order';
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

	async create(order: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO Orders (user_id, isCompleted) VALUES($1, $2) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [
				order.user_id,
				order.isCompleted,
			]);

			const newOrder: Order = result.rows[0];

			conn.release();

			return newOrder;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async update(order: Order): Promise<Order> {
		try {
			const sql =
				'UPDATE Orders SET user_id=($1), isCompleted=($2) WHERE id=($3) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [
				order.user_id,
				order.isCompleted,
			]);
			const newOrder: Order = result.rows[0];

			conn.release();

			if (!newOrder) throw new Error('Order not found');

			return newOrder;
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
	async currentOrders(
		id: string,
		isCompleted: boolean = false
	): Promise<CurrentOrders[]> {
		try {
			//@ts-ignore
			const conn = await Pool.connect();
			const sql = `
			SELECT o.id, p.name, p.price, p.category, p.description, op.quantity
			FROM orders_products op 
			INNER JOIN Orders o ON o.id = op.order_id
			INNER JOIN Products p ON p.id = op.product_id
			WHERE user_id = ($1) AND isCompleted = ($2)`;

			const result = await conn.query(sql, [id, isCompleted]);

			conn.release();

			const orders: CurrentOrders[] = result.rows;

			return orders;
		} catch (error) {
			throw new Error(`unable get Orders with user: ${error}`);
		}
	}
	async indexProduct(): Promise<OrderProduct[]> {
		try {
			const sql = 'SELECT * FROM orders_products';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql);

			const orders: OrderProduct[] = result.rows;

			conn.release();

			return orders;
		} catch (error) {
			throw new Error(
				`Could not get orders. Error: ${(error as Error).message}`
			);
		}
	}

	async showProduct(id: string): Promise<OrderProduct> {
		try {
			const sql = 'SELECT * FROM orders_products WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const order: OrderProduct = result.rows[0];

			conn.release();

			if (!order) throw new Error('Order Product not found');

			return order;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async createProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
		try {
			const sql =
				'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [
				orderProduct.order_id,
				orderProduct.product_id,
				orderProduct.quantity,
			]);

			const newOrderProduct: OrderProduct = result.rows[0];

			conn.release();

			return newOrderProduct;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async updateProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
		try {
			const sql =
				'UPDATE orders_products SET order_id=($1), product_id=($2), quantity=($3) WHERE id=($4) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [
				orderProduct.order_id,
				orderProduct.product_id,
				orderProduct.quantity,
				orderProduct.id,
			]);
			const newOrderProduct: OrderProduct = result.rows[0];

			conn.release();

			if (!newOrderProduct) throw new Error('Order Product not found');

			return newOrderProduct;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
	async deleteProduct(id: string): Promise<OrderProduct> {
		try {
			const sql = 'DELETE FROM orders_products WHERE id=($1) RETURNING *';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const orderProduct: OrderProduct = result.rows[0];

			conn.release();

			if (!orderProduct) throw new Error('Order product not found');

			return orderProduct;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
}
