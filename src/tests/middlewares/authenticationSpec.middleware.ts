import { authentication } from '../../middlewares/authentication.middleware';
describe('Authentication middleware', () => {
	it('should have an authentication method', () => {
		expect(authentication).toBeDefined();
	});
});
