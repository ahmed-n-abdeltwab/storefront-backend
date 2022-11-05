import { create, destroy, index, show } from '../../handlers/product';

describe('Product Handler', () => {
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
});
