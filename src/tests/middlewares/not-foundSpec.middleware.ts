import notFound from '../../middlewares/not-found.middleware';
describe('Not Found middleware', () => {
	it('should have an notFound method', () => {
		expect(notFound).toBeDefined();
	});
});
