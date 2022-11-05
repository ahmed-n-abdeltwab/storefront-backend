import { OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';
import { ProductStore } from '../../models/product';

import { Order } from '../../types/order';
import { User } from '../../types/user';
import { Product } from '../../types/product';

const order_store = new OrderStore();
const user_store = new UserStore();
const product_store = new ProductStore();

const order: Order = {
	product_id: 1,
	quantity: 50,
	user_id: 1,
	status: 'active',
};

const user: User = {
	username: 'userTest',
	firstname: 'test',
	lastname: 'test',
	password: 'test',
};

const product: Product = {
	name: 'product',
	price: 100,
	category: 'category',
};

let user_id: number, product_id: number, order_id: number;

describe('Order Model', () => {
	beforeAll(async () => {
		user_id = (await user_store.create(user))?.id ?? 1;
		product_id = (await product_store.create(product))?.id ?? 1;
	});
	afterAll(async () => {
		await user_store.delete(user_id?.toString());
		await product_store.delete(product_id?.toString());
	});
	it('should have an index method', () => {
		expect(order_store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(order_store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(order_store.create).toBeDefined();
	});

	it('should have a update method', () => {
		expect(order_store.update).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(order_store.delete).toBeDefined();
	});

	it('should have a userWithOrders method', () => {
		expect(order_store.userWithOrder).toBeDefined();
	});

	it('create method should add a order', async () => {
		const result: Order = await order_store.create(order);
		order_id = result?.id ?? 1;
		expect(result).toEqual({ ...order, id: order_id });
	});

	it('index method should return a list of orders', async () => {
		const result = await order_store.index();
		expect(result).toEqual([{ ...order, id: order_id }]);
	});

	it('show method should return the correct order', async () => {
		const result = await order_store.show(order_id.toString());
		expect(result).toEqual({ ...order, id: order_id });
	});

	it('delete method should remove the order', async () => {
		await order_store.delete(order_id.toString());
		const result = await order_store.index();

		expect(result).toEqual([]);
	});
});
