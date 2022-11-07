import express from 'express';

const router = express.Router();

// import the handlers
import { index, show, create, destroy, update } from '../controllers/product';

import { authentication, InputProductValidation } from '../middlewares/index';
// route the handlers

router.use(authentication);
router
	.route('/')
	.get(index)
	.post(InputProductValidation, create);
router
	.route('/:id')
	.get(show)
	.put(InputProductValidation, update)
	.delete(destroy);

export default router;
