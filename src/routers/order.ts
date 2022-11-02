import express from 'express';

const router = express.Router();

// import the handlers
import { index, show, create, destroy, update } from '../handlers/order';
import { authorization } from '../middlewares/authorization.middleware';
import { authentication } from '../middlewares/authentication.middleware';
// route the handlers

router.route('/').get(index).post(authentication, authorization, create);

router
	.route('/:id')
	.delete(authentication, authorization, destroy)
	.put(authentication, authorization, update)
	.get(show);

export default router;
