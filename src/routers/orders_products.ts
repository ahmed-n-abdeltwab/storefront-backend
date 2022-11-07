import express from 'express';

const router = express.Router();

// import the handlers
import {
	createProduct,
	currentOrders,
	deleteProduct,
	indexProduct,
	showProduct,
	updateProduct,
} from '../controllers/orders_products';

import { authentication } from '../middlewares/index';

router.use(authentication)

router.route('/').get(indexProduct).post(createProduct);

router
	.route('/:id')
	.delete(deleteProduct)
	.put(updateProduct)
	.get(showProduct);

router.route('/currentOrders/:id').get(currentOrders);

export default router;
