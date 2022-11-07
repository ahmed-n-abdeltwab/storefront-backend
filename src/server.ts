import express, { Request, Response } from 'express';
import cors from 'cors';
import config from "config";

// import the routes
import routes from './routers/index';

// import the middlewares
import { notFound, error, logger } from './middlewares/index';

const app: express.Application = express();
const port: number = config.get('server.port')
const address: string = config.get('server.host')

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

app.listen(port, address, () => {
	console.log(`starting app on: http://${address}:${port}`);
});

export default app;
