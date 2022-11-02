import express from 'express';

const router = express.Router();

// import the handlers
import { index, show, create, destroy } from '../handlers/product';
import { authorization } from '../middlewares/authorization.middleware';
import { authentication } from '../middlewares/authentication.middleware';
// route the handlers

router
	.route('/')
	.get(index)
	.post(authentication, authorization, create)
	.delete(authentication, authorization, destroy);
router.route('/:id').get(show);

export default router;
