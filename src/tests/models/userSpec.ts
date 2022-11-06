import { UserStore } from '../../models/index';
import { User } from '../../types/index';

const store = new UserStore();

const user: User = {
	username: 'userTest',
	firstname: 'test',
	lastname: 'test',
	password: 'test',
	role: 'user',
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
		user.id = user_id = result?.id as number;
		const { password: resultpassword, ...resultRest } = result;
		const { password: userpassword, ...userRest } = user;
		expect(resultRest).toEqual(userRest);
	});

	it('index method should return a list of users', async () => {
		const result = await store.index();
		const { password: userpassword, ...userRest } = user;
		expect(
			result.map((r) => {
				const { password, ...resultRest } = r;
				return resultRest;
			})
		).toContain(userRest);
	});

	it('show method should return the correct user', async () => {
		const result = await store.show(user_id.toString());
		const { password: resultpassword, ...resultRest } = result;
		const { password: userpassword, ...userRest } = user;
		expect(resultRest).toEqual(userRest);
	});

	it('delete method should remove the user', async () => {
		const result = await store.delete(user_id.toString());
		const { password: resultpassword, ...resultRest } = result;
		const { password: userpassword, ...userRest } = user;
		expect(resultRest).toEqual(userRest);
	});
});
