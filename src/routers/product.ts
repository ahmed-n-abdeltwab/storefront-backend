import express from 'express';

const router = express.Router();

// import the handlers
import { index, show, create, destroy, update } from '../handlers/product';

import { authentication } from '../middlewares/authentication.middleware';
// route the handlers

router.route('/').get(index).post(authentication, create);
router
	.route('/:id')
	.get(show)
	.put(authentication, update)
	.delete(authentication, destroy);

export default router;
