import { authorization } from '../../middlewares/authorization.middleware';
describe('Authorization middleware', () => {
	it('should have an authorization method', () => {
		expect(authorization).toBeDefined();
	});
});
