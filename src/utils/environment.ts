import dotenv from 'dotenv';

dotenv.config();

export const {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV,
	TOKEN_SECRET,
	BCRYPT_PASSWORD,
	SALT_ROUNDS,
} = process.env;
