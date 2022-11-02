import { Request, Response } from 'express';

const notFound = (_req: Request, res: Response): void => {
	res.status(404).send('Route does not exist');
	return;
};

export default notFound;
