import supertest from 'supertest';
import { Order, User, Headers } from '../../types/index';
import { UserStore } from '../../models/index';
import app from '../../server';
import { create, destroy, index, show, update } from '../../controllers/order';

let commonHeaders: Headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

const userObj: User = {
	username: 'testOrders',
	firstname: 'test',
	lastname: 'order',
	password: 'test',
	role: 'admin',
};
const orderObj: Order = {
	user_id: 1,
	completed: false,
};

let order_id: number;

const user_store = new UserStore();
const request = supertest(app);

describe('Order Controller', () => {
	beforeAll(async () => {
		orderObj.user_id = (await user_store.create(userObj))?.id as number;
		const response = await request
			.post('/api/users/authenticate')
			.send({ username: userObj.username, password: userObj.password })
			.set(commonHeaders);
		commonHeaders.Authorization = `Bearer ${response.body}`;
	});
	afterAll(async () => {
		await user_store.delete(orderObj.user_id?.toString());
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
	it('should respond with status 201 at route /api/orders [POST]', async () => {
		const response = await request
			.post('/api/orders')
			.send(orderObj)
			.set(commonHeaders);
		order_id = response.body.id;
		expect(response.status).toEqual(201);
	});
	it('should respond with status 200 at route /api/orders [GET]', async () => {
		const response = await request.get('/api/orders').set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/orders/:id [GET]`, async () => {
		const response = await request
			.get(`/api/orders/${order_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/orders/:id [PUT]`, async () => {
		const response = await request
			.put(`/api/orders/${order_id}`)
			.send(orderObj)
			.set(commonHeaders);
		expect(response.status).toEqual(201);
	});
	it(`should respond with status 200 at route /api/orders/:id [DELETE]`, async () => {
		const response = await request
			.delete(`/api/orders/${order_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
});
