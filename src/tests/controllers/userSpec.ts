import supertest from 'supertest';
import app from '../../server';
import { User, Headers } from '../../types/index';
import {
	create,
	destroy,
	index,
	show,
	update,
	authenticate,
} from '../../controllers/user';

let commonHeaders: Headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

const userObj: User = {
	username: 'testUsers',
	firstname: 'test',
	lastname: 'test',
	password: 'test',
	role: 'admin',
};
let user_id: string;

const request = supertest(app);

describe('User Controller', () => {
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
	it('should have an authenticate method', () => {
		expect(authenticate).toBeDefined();
	});
	it('should respond with status 201 at route /api/users [POST]', async () => {
		const response = await request
			.post('/api/users')
			.send(userObj)
			.set(commonHeaders);
		user_id = response.body.id;
		expect(response.status).toEqual(201);
	});
	it(`should respond with status 200 at route /api/users/authenticate [POST]`, async () => {
		const response = await request
			.post('/api/users/authenticate')
			.send({ username: userObj.username, password: userObj.password })
			.set(commonHeaders);
		commonHeaders.Authorization = `Bearer ${response.body}`;
		expect(response.status).toEqual(200);
	});
	it('should respond with status 200 at route /api/users [GET]', async () => {
		const response = await request.get('/api/users').set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/users/:id [GET]`, async () => {
		const response = await request
			.get(`/api/users/${user_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
	it(`should respond with status 200 at route /api/users/:id [PUT]`, async () => {
		const response = await request
			.put(`/api/users/${user_id}`)
			.send(userObj)
			.set(commonHeaders);
		expect(response.status).toEqual(201);
	});
	it(`should respond with status 200 at route /api/users/:id [DELETE]`, async () => {
		const response = await request
			.delete(`/api/users/${user_id}`)
			.set(commonHeaders);
		expect(response.status).toEqual(200);
	});
});
