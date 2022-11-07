import express from 'express';

const router = express.Router();

// import the handlers
import { index, show, create, destroy, update } from '../controllers/product';

import { authentication, InputProductValidation } from '../middlewares/index';
// route the handlers

router
	.route('/')
	.get(index)
	.post(authentication, InputProductValidation, create);
router
	.route('/:id')
	.get(show)
	.put(authentication, InputProductValidation, update)
	.delete(authentication, destroy);

export default router;
