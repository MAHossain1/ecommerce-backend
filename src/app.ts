import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.routes';
import { OrderRoutes } from './app/modules/order/order.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// test
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!!');
});

// handle not found routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
