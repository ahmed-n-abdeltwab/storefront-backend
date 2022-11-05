import {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV,
	TOKEN_SECRET,
	BCRYPT_PASSWORD,
	SALT_ROUNDS,
} from '../../utils/environment';

describe('Environment utils', () => {
	it('should have a POSTGRES_HOST varible', () => {
		expect(POSTGRES_HOST).toBeDefined();
	});
	it('should have a POSTGRES_DB varible', () => {
		expect(POSTGRES_DB).toBeDefined();
	});
	it('should have a POSTGRES_TEST_DB varible', () => {
		expect(POSTGRES_TEST_DB).toBeDefined();
	});
	it('should have a POSTGRES_USER varible', () => {
		expect(POSTGRES_USER).toBeDefined();
	});
	it('should have a POSTGRES_PASSWORD varible', () => {
		expect(POSTGRES_PASSWORD).toBeDefined();
	});
	it('should have a ENV varible', () => {
		expect(ENV).toBeDefined();
	});
	it('should have a TOKEN_SECRET varible', () => {
		expect(TOKEN_SECRET).toBeDefined();
	});
	it('should have a BCRYPT_PASSWORD varible', () => {
		expect(BCRYPT_PASSWORD).toBeDefined();
	});
	it('should have a SALT_ROUNDS varible', () => {
		expect(SALT_ROUNDS).toBeDefined();
	});
});
