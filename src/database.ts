import { Pool } from 'pg';
import {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV,
} from './utils/environment';

let pool = new Pool();

if (ENV === 'dev') {
	pool = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

if (ENV === 'test') {
	pool = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_TEST_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

export default pool;
