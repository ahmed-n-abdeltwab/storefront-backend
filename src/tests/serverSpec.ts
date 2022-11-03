import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('The Server app', () => {
	it('should respond with status 200 at route /', async () => {
		const response = await request.get('/');
		expect(response.status).toEqual(200);
	});
	it('should respond with status 404 at wrong route', async () => {
		const response = await request.get('/test');
		expect(response.status).toEqual(404);
	});
});
