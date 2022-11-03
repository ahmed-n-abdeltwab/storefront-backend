import express from 'express';

const router = express.Router();

// import the handlers
import {
	index,
	show,
	create,
	update,
	destroy,
	authenticate,
} from '../handlers/user';
import { authorization } from '../middlewares/authorization.middleware';
import { authentication } from '../middlewares/authentication.middleware';
// route the handlers

router.route('/').get(authentication, authorization, index).post(create);
router
	.route('/:id')
	.get(authentication, authorization, show)
	.put(authentication, authorization, update)
	.delete(authentication, authorization, destroy);
router.route('/authenticate').post(authenticate);

export default router;
