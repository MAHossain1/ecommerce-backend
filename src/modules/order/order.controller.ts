import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrderIntoDB = async (req: Request, res: Response) => {
  try {
    const orderData = req.body.order;

    const result = await OrderService.createOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order.',
      error,
    });
  }
};

export const OrderController = {
  createOrderIntoDB,
};
