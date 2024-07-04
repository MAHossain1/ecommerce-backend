import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.createOrderIntoDB);
router.get('/', OrderController.getOrdersFromDB);

export const OrderRoutes = router;
