import { error } from '../../middlewares/index';
describe('Error middleware', () => {
	it('should have an errorMiddleware method', () => {
		expect(error).toBeDefined();
	});
});
