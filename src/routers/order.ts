import express from 'express';

const router = express.Router();

// import the handlers
import { index, show, create, destroy, update } from '../controllers/order';

import { authentication } from '../middlewares/index';
// route the handlers

router.route('/').get(authentication, index).post(authentication, create);

router
	.route('/:id')
	.delete(authentication, destroy)
	.put(authentication, update)
	.get(authentication, show);

export default router;
