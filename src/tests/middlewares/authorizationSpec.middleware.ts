import { authorization } from '../../middlewares/index';
describe('Authorization middleware', () => {
	it('should have an authorization method', () => {
		expect(authorization).toBeDefined();
	});
});
