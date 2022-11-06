import { OrderStore, UserStore, ProductStore } from '../../models/index';

import {
	User,
	Product,
	Order,
	CurrentOrders,
	OrderProduct,
} from '../../types/index';

const order: Order = {
	user_id: 1,
	completed: false,
};

const user: User = {
	username: 'orderModleTest',
	firstname: 'test',
	lastname: 'test',
	password: 'test',
	role: 'admin',
};

const product: Product = {
	name: 'product',
	price: '100',
	category: 'category',
	description: 'description',
};

const orderProduct: OrderProduct = {
	quantity: 50,
};
const currentOrders: CurrentOrders = {
	quantity: orderProduct.quantity,
	name: product.name,
	category: product.category,
	price: product.price,
	description: product.description,
};

const order_store = new OrderStore();
const user_store = new UserStore();
const product_store = new ProductStore();

let user_id: number,
	product_id: number,
	order_id: number,
	orderProduct_id: number;

describe('Order Model', () => {
	beforeAll(async () => {
		order.user_id = user_id = (await user_store.create(user))?.id as number;
		orderProduct.product_id = product_id = (
			await product_store.create(product)
		)?.id as number;
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

	it('should have a indexProduct method', () => {
		expect(order_store.indexProduct).toBeDefined();
	});

	it('should have a createProduct method', () => {
		expect(order_store.createProduct).toBeDefined();
	});

	it('should have a showProduct method', () => {
		expect(order_store.showProduct).toBeDefined();
	});

	it('should have a updateProduct method', () => {
		expect(order_store.updateProduct).toBeDefined();
	});

	it('should have a deleteProduct method', () => {
		expect(order_store.deleteProduct).toBeDefined();
	});

	it('should have a currentOrders method', () => {
		expect(order_store.currentOrders).toBeDefined();
	});

	it('create method should add a order', async () => {
		const result: Order = await order_store.create(order);
		orderProduct.order_id =
			currentOrders.id =
			order.id =
			order_id =
				result?.id as number;
		expect(result).toEqual(order);
	});

	it('index method should return a list of orders', async () => {
		const result = await order_store.index();
		expect(result).toContain(order);
	});

	it('show method should return the correct order', async () => {
		const result = await order_store.show(order_id.toString());
		expect(result).toEqual(order);
	});

	it('createProduct method should add a Product', async () => {
		const result: OrderProduct = await order_store.createProduct(
			orderProduct
		);
		orderProduct.id = orderProduct_id = result?.id as number;
		expect(result).toEqual(orderProduct);
	});

	it('indexProduct method should return a list of Products', async () => {
		const result = await order_store.indexProduct();
		expect(result).toContain(orderProduct);
	});

	it('showProduct method should return the correct Product', async () => {
		const result = await order_store.showProduct(
			orderProduct_id.toString()
		);
		expect(result).toEqual(orderProduct);
	});
	it('currentOrders method should return the active Orders', async () => {
		const result = await order_store.currentOrders(
			user_id.toString(),
			false
		);
		expect(result).toContain(currentOrders);
	});
	it('currentOrders method should return the completed Orders', async () => {
		const result = await order_store.currentOrders(
			user_id.toString(),
			true
		);
		expect(result).toEqual([]);
	});
	it('delete method should remove the order', async () => {
		const result = await order_store.delete(order_id.toString());
		expect(result).toEqual(order);
	});
	it('deleteProduct method should remove the Product', async () => {
		const result = await order_store.deleteProduct(
			orderProduct_id.toString()
		);
		expect(result.id).toEqual(orderProduct.id);
	});
});
