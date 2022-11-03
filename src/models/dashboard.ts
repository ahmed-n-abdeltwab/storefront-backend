// @ts-ignore
import Pool from '../database';
import { UserWithOrders } from '../types/dashboard';
export class DashboardQueries {
	// Get all orders that have been included in single user
	async userWithOrders(id: string): Promise<UserWithOrders[]> {
		try {
			//@ts-ignore
			const conn = await Pool.connect();
			const sql = `SELECT p.name, o.id, o.quantity, o.status
            FROM Orders o INNER JOIN Products p
            ON o.product_id = p.id WHERE o.user_id = ($1)`;

			const result = await conn.query(sql, [id]);

			conn.release();

			const orders: UserWithOrders[] = result.rows;

			return orders;
		} catch (error) {
			throw new Error(`unable get Orders with user: ${error}`);
		}
	}
}
