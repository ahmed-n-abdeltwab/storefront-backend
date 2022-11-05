import express from 'express';

const router = express.Router();

import userRouter from './user';
import productRouter from './product';
import orderRouter from './order';
import ordersProductsRouter from './orders_products';

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/ordersProducts', ordersProductsRouter);

export default router;
