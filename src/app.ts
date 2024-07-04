import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.routes';
import { OrderRoutes } from './modules/order/order.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// test
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
