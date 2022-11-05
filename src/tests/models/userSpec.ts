import { UserStore } from '../../models/user';
import { User } from '../../types/user'
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS ?? '10';
const pepper = process.env.BCRYPT_PASSWORD;
const store = new UserStore();

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
        const user:User = {
            username: 'userTest',
            firstname: 'test',
            lastname: 'test',
            password: 'test',
        };
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
		const result = await store.create(user);
		expect(result).toEqual({
			id: 1,
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			password: hash,
		});
	});

	it('index method should return a list of users', async () => {
        const user:User = {
            username: 'userTest',
            firstname: 'test',
            lastname: 'test',
            password: 'test',
        };
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 1,
				username: user.username,
				firstname: user.firstname,
				lastname: user.lastname,
				password: hash,
			},
		]);
	});

	it('show method should return the correct user', async () => {
        const user:User = {
            username: 'userTest',
            firstname: 'test',
            lastname: 'test',
            password: 'test',
        };
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
		const result = await store.show('1');
		expect(result).toEqual({
			id: 1,
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			password: hash,
		});
	});

	it('delete method should remove the user', async () => {
		await store.delete('1');
		const result = await store.index();

		expect(result).toEqual([]);
	});
});
