import express from 'express';

const router = express.Router();

// import the handlers
import { ordersInUser, productsInOrders } from '../handlers/dashboard';

import { authorization } from '../middlewares/authorization.middleware';
import { authentication } from '../middlewares/authentication.middleware';

router
	.route('/products_in_orders/:id')
	.get(authentication, authorization, productsInOrders);

router
	.route('/orders_in_user/:id')
	.get(authentication, authorization, ordersInUser);

export default router;
