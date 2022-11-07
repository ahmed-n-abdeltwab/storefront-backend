import { HttpException } from '../../errors/HttpException';

describe('Http Exception', () => {
	it('should have a class', async () => {
		expect(HttpException).toBeDefined();
	});
});
