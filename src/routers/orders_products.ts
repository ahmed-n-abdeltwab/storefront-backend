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

router.route('/').get(indexProduct).post(authentication, createProduct);

router
	.route('/:id')
	.delete(authentication, deleteProduct)
	.put(authentication, updateProduct)
	.get(showProduct);

router.route('/currentOrders/:id').get(authentication, currentOrders);

export default router;
