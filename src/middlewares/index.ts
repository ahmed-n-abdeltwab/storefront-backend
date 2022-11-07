import { authentication } from './authentication.middleware';
import { authorization } from './authorization.middleware';
import error from './error.middleware';
import logger from './logger.middleware';
import notFound from './not-found.middleware';
import { InputProductValidation } from './product.middleware';
import { InputUserValidation } from './user.middleware';

export {
	authentication,
	authorization,
	error,
	logger,
	notFound,
	InputProductValidation,
	InputUserValidation,
};
