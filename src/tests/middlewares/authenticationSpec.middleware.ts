import { authentication } from '../../middlewares/index';
describe('Authentication middleware', () => {
	it('should have an authentication method', () => {
		expect(authentication).toBeDefined();
	});
});
