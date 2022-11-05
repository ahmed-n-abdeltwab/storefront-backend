import express from 'express';

const router = express.Router();

// import the handlers
import { userWithOrder, userWithActiveOrders } from '../handlers/dashboard';

import { authorization } from '../middlewares/authorization.middleware';
import { authentication } from '../middlewares/authentication.middleware';

router
	.route('/user_with_order/:id')
	.get(authentication, authorization, userWithOrder);

router
	.route('/user_with_active_orders/:id')
	.get(authentication, authorization, userWithActiveOrders);
export default router;
