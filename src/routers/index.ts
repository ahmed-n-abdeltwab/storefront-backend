import express from 'express';

const router = express.Router();

import userRouter from './user';
import productRouter from './product';
import orderRouter from './order';
import dashboardRouter from './dashboard';

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use(dashboardRouter);

export default router;
