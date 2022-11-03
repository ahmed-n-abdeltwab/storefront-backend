// @ts-ignore
import Pool from '../database';
import { OrdersInUser, ProductsInOrders } from '../types/dashboard';
export class DashboardQueries {
	// Get all products that have been included in orders
	async productsInOrders(id: string): Promise<ProductsInOrders[]> {
		try {
			//@ts-ignore
			const conn = await Pool.connect();
			const sql = `SELECT p.name, p.price, o.id
            FROM Products p INNER JOIN Orders o
            ON o.product_id = p.id WHERE o.id = ($1)`;

			const result = await conn.query(sql, [id]);

			conn.release();

			const products: ProductsInOrders[] = result.rows;

			return products;
		} catch (error) {
			throw new Error(`unable get products and orders: ${error}`);
		}
	}
	// Get all orders that have been included in single user
	async ordersInUser(id: string): Promise<OrdersInUser[]> {
		try {
			//@ts-ignore
			const conn = await Pool.connect();
			const sql = `SELECT p.name, o.id, o.quantity, o.status
            FROM Orders o INNER JOIN Products p
            ON o.product_id = p.id WHERE o.user_id = ($1)`;

			const result = await conn.query(sql, [id]);

			conn.release();

			const orders: OrdersInUser[] = result.rows;

			return orders;
		} catch (error) {
			throw new Error(`unable get Orders and user: ${error}`);
		}
	}
}
