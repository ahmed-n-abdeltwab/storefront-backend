import {
	create,
	destroy,
	index,
	show,
	update,
	authenticate,
} from '../../handlers/user';

describe('User Handler', () => {
	it('should have an create method', () => {
		expect(create).toBeDefined();
	});
	it('should have an destroy method', () => {
		expect(destroy).toBeDefined();
	});
	it('should have an index method', () => {
		expect(index).toBeDefined();
	});
	it('should have an show method', () => {
		expect(show).toBeDefined();
	});
	it('should have an update method', () => {
		expect(update).toBeDefined();
	});
	it('should have an authenticate method', () => {
		expect(authenticate).toBeDefined();
	});
});
