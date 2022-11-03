import express from 'express';

const router = express.Router();

// import the handlers
import { userWithOrders } from '../handlers/dashboard';

import { authorization } from '../middlewares/authorization.middleware';
import { authentication } from '../middlewares/authentication.middleware';

router
	.route('/user_with_orders/:id')
	.get(authentication, authorization, userWithOrders);

export default router;
