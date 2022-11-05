import errorMiddleware from '../../middlewares/error.middleware';
describe('Error middleware', () => {
	it('should have an errorMiddleware method', () => {
		expect(errorMiddleware).toBeDefined();
	});
});
