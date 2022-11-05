import express, { Request, Response } from 'express';
import cors from 'cors'; 

// import the routes
import routes from './routers/index';

// import the middlewares
import invalidPathHandler from './middlewares/not-found.middleware';
import errorMiddleware from './middlewares/error.middleware';
import loggerMiddleware from './middlewares/logger.middleware';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.json());
app.use(cors()); 

// logger
app.use(loggerMiddleware)

app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

app.use(routes)
app.use(errorMiddleware);
app.use(invalidPathHandler);

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});

export default app;
