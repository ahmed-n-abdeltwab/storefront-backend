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
// route the handlers
router.route('/').get(index).post(create);
router
	.route('/:id')
	.get(authorization, show)
	.put(authorization, update)
	.delete(authorization, destroy);
router.route('/authenticate').post(authenticate);

export default router;
