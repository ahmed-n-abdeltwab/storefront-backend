import supertest from 'supertest';

import { Product, User, Headers } from '../../types/index';
import { UserStore } from '../../models/index';

import app from '../../server';

import {
	create,
	destroy,
	index,
	show,
	update,
} from '../../controllers/product';

let commonHeaders: Headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

const userObj: User = {
	username: 'testProducts',
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

let product_id: number, user_id: number;

const request = supertest(app);
const user_store = new UserStore();

describe('Product Handler', () => {
	beforeAll(async () => {
		user_id = (await user_store.create(userObj))?.id ?? 1;
		const response = await request
			.post('/api/users/authenticate')
			.send({ username: userObj.username, password: userObj.password })
			.set(commonHeaders);
		commonHeaders.Authorization = `Bearer ${response.body}`;
	});
	afterAll(async () => {
		await user_store.delete(user_id?.toString());
	});
	it('should have a create method', () => {
		expect(create).toBeDefined();
	});
	it('should have a destroy method', () => {
		expect(destroy).toBeDefined();
	});
	it('should have an index method', () => {
		expect(index).toBeDefined();
	});
	it('should have a show method', () => {
		expect(show).toBeDefined();
	});
	it('should have an update method', () => {
		expect(update).toBeDefined();
	});
	it('should respond with status 201 at route /api/products [POST]', async () => {
		const response = await request
			.post('/api/products')
			.send(productObj)
			.set(commonHeaders);
		product_id = response.body.id;
		expect(response.status).toEqual(201);
	});
	it('should respond with status 200 at route /api/products [GET]', async () => {
		const response = await request.get('/api/products').set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/products/:id [GET]`, async () => {
		const response = await request
			.get(`/api/products/${product_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/products/:id [PUT]`, async () => {
		const response = await request
			.put(`/api/products/${product_id}`)
			.send(productObj)
			.set(commonHeaders);
		expect(response.status).toEqual(201);
	});
	it(`should respond with status 200 at route /api/products/:id [DELETE]`, async () => {
		const response = await request
			.delete(`/api/products/${product_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
});
