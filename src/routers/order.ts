import express from 'express';

const router = express.Router();

// import the handlers
import { index, show, create, destroy, update } from '../controllers/order';

import { authentication } from '../middlewares/index';
// route the handlers
router.use(authentication)
router.route('/').get(index).post(create);

router
	.route('/:id')
	.delete(destroy)
	.put(update)
	.get(show);

export default router;
