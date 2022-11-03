import express, { Request, Response } from 'express';

// import the routes
import userRouter from './routers/user';
import productRouter from './routers/product';
import orderRouter from './routers/order';
import dashboardRouter from './routers/dashboard';

// import the middlewares
import invalidPathHandler from './middlewares/not-found.middleware';
import errorMiddleware from './middlewares/error.middleware';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use(dashboardRouter);

app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

app.use(errorMiddleware);
app.use(invalidPathHandler);

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});

export default app;
