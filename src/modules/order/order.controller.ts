import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { orderZodValidation } from './order.validation';

const createOrderIntoDB = async (req: Request, res: Response) => {
  try {
    const orderData = req.body.order;

    const parsedOrderData =
      orderZodValidation.createOrderValidationSchema.parse(orderData);

    const result = await OrderService.createOrderIntoDB(parsedOrderData);

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
