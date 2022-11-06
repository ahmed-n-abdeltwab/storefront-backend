import { notFound } from '../../middlewares/index';
describe('Not Found middleware', () => {
	it('should have an notFound method', () => {
		expect(notFound).toBeDefined();
	});
});
