// @ts-ignore
import Pool from '../database';

export type Order = {
	id?: Number;
	product_id: String;
	quantity: Number;
	user_id: String;
	status: String;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			// @ts-ignore
			const conn = await Pool.connect();
			const sql = 'SELECT * FROM Orders';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Could not get orders. Error: ${err}`);
		}
	}

	async show(id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM Orders WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order ${id}. Error: ${err}`);
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

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(
				`Could not add new order with product ${o.product_id}. Error: ${err}`
			);
		}
	}

	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM Orders WHERE id=($1)';
			// @ts-ignore
			const conn = await Pool.connect();

			const result = await conn.query(sql, [id]);

			const order = result.rows[0] as Order;

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not delete order ${id}. Error: ${err}`);
		}
	}
}
