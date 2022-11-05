import { UserStore } from '../../models/user';
import { User } from '../../types/user';

const store = new UserStore();

const user: User = {
	username: 'userTest',
	firstname: 'test',
	lastname: 'test',
	password: 'test',
};

let user_id: number;

describe('User Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('should have a update method', () => {
		expect(store.update).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});

	it('create method should add a user', async () => {
		const result = await store.create(user);
		user_id = result?.id ?? 2;
		expect(result?.id).toEqual(user_id);
		expect(result?.username).toEqual(user.username);
		expect(result?.firstname).toEqual(user.firstname);
		expect(result?.lastname).toEqual(user.lastname);
	});

	it('index method should return a list of users', async () => {
		const result = await store.index();
		expect(result[0]?.id).toEqual(user_id);
		expect(result[0]?.username).toEqual(user.username);
		expect(result[0]?.firstname).toEqual(user.firstname);
		expect(result[0]?.lastname).toEqual(user.lastname);
	});

	it('show method should return the correct user', async () => {
		const result = await store.show(user_id.toString());
		expect(result?.id).toEqual(user_id);
		expect(result?.username).toEqual(user.username);
		expect(result?.firstname).toEqual(user.firstname);
		expect(result?.lastname).toEqual(user.lastname);
	});

	it('delete method should remove the user', async () => {
		await store.delete(user_id.toString());
		const result = await store.index();

		expect(result).toEqual([]);
	});
});
