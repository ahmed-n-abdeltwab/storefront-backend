import express, { Request, Response } from 'express';
import cors from 'cors';

// import the routes
import routes from './routers/index';

// import the middlewares
import { notFound, error, logger } from './middlewares/index';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.json());
app.use(cors());

// logger
app.use(logger);

app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

app.use('/api', routes);
app.use(error);
app.use(notFound);

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});

export default app;
