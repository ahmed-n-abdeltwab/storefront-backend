import supertest from 'supertest';
import app from '../../server';

import {
	createProduct,
	deleteProduct,
	indexProduct,
	showProduct,
	updateProduct,
	currentOrders,
} from '../../controllers/orders_products';

import { ProductStore, UserStore, OrderStore } from '../../models/index';

import { Product, User, Order, OrderProduct, Headers } from '../../types/index';

let commonHeaders: Headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

const orderObj: Order = {
	user_id: 1,
	completed: false,
};

const userObj: User = {
	username: 'testOrdersProducts',
	firstname: 'test',
	lastname: 'test',
	password: 'test',
	role: 'admin',
};

const productObj: Product = {
	name: 'product',
	price: '100',
	category: 'category',
	description: 'description',
};

const orderProductObj: OrderProduct = {
	quantity: 50,
};

const order_store = new OrderStore();
const user_store = new UserStore();
const product_store = new ProductStore();

const request = supertest(app);

let orderProduct_id: number;

describe('Orders Products Controller', () => {
	beforeAll(async () => {
		orderObj.user_id = (await user_store.create(userObj))?.id as number;
		orderProductObj.product_id = (await product_store.create(productObj))
			?.id as number;
		orderProductObj.order_id = (await order_store.create(orderObj))
			?.id as number;
		const response = await request
			.post('/api/users/authenticate')
			.send({ username: userObj.username, password: userObj.password })
			.set(commonHeaders);
		commonHeaders.Authorization = `Bearer ${response.body}`;
	});
	afterAll(async () => {
		await order_store.delete(
			orderProductObj.order_id ? orderProductObj.order_id.toString() : ''
		);
		await product_store.delete(
			orderProductObj.product_id
				? orderProductObj.product_id.toString()
				: ''
		);
		await user_store.delete(
			orderObj.user_id ? orderObj.user_id.toString() : ''
		);
	});
	it('should have an indexProduct method', () => {
		expect(indexProduct).toBeDefined();
	});
	it('should have a currentOrders method', () => {
		expect(currentOrders).toBeDefined();
	});
	it('should have a createProduct method', () => {
		expect(createProduct).toBeDefined();
	});
	it('should have a deleteProduct method', () => {
		expect(deleteProduct).toBeDefined();
	});
	it('should have a deleteProduct method', () => {
		expect(deleteProduct).toBeDefined();
	});
	it('should have a showProduct method', () => {
		expect(showProduct).toBeDefined();
	});
	it('should have an updateProduct method', () => {
		expect(updateProduct).toBeDefined();
	});
	it('should respond with status 201 at route /api/ordersProducts [POST]', async () => {
		const response = await request
			.post('/api/ordersProducts')
			.send(orderProductObj)
			.set(commonHeaders);
		orderProduct_id = response.body.id;
		expect(response.status).toEqual(200);
	});
	it('should respond with status 200 at route /api/ordersProducts [GET]', async () => {
		const response = await request
			.get('/api/ordersProducts')
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/ordersProducts/:id [GET]`, async () => {
		const response = await request
			.get(`/api/ordersProducts/${orderProduct_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/ordersProducts/:id [PUT]`, async () => {
		const response = await request
			.put(`/api/ordersProducts/${orderProduct_id}`)
			.send(orderProductObj)
			.set(commonHeaders);
		expect(response.status).toEqual(201);
	});
	it(`should respond with status 200 at route /api/ordersProducts/currentOrders/:id [GET]`, async () => {
		const response = await request
			.get(`/api/ordersProducts/currentOrders/${orderProduct_id}`)
			.send({
				completed: false,
			})
			.set(commonHeaders);
		expect(response.status).toEqual(200);
		expect(response.body.nbHits).toEqual(1);
	});
	it(`should respond with status 200 at route /api/ordersProducts/currentOrders/:id [GET]`, async () => {
		const response = await request
			.get(`/api/ordersProducts/currentOrders/${orderProduct_id}`)
			.send({
				completed: true,
			})
			.set(commonHeaders);
		expect(response.status).toEqual(200);
		expect(response.body.nbHits).toEqual(0);
	});
	it(`should respond with status 200 at route /api/ordersProducts/:id [DELETE]`, async () => {
		const response = await request
			.delete(`/api/ordersProducts/${orderProduct_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
});
