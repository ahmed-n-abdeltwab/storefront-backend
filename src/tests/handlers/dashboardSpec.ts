import { userWithOrder, userWithActiveOrders } from '../../handlers/dashboard';

describe('Dashboard Handler', () => {
	it('should have a userWithOrder method', () => {
		expect(userWithOrder).toBeDefined();
	});
	it('should have a userWithActiveOrders method', () => {
		expect(userWithActiveOrders).toBeDefined();
	});
});
