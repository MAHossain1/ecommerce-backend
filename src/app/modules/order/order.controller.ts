import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { orderZodValidation } from './order.validation';
import { TOrder } from './order.interface';

const createOrderIntoDB = async (req: Request, res: Response) => {
  try {
    const orderData = req.body.order;
    // console.log(orderData);

    const parsedOrderData =
      orderZodValidation.createOrderValidationSchema.parse(orderData);
    // console.log(parsedOrderData);

    const result = await OrderService.createOrderIntoDB(
      parsedOrderData as unknown as TOrder,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully.',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Failed to create order.',
      error: err.message,
    });
  }
};

const getOrdersFromDB = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrdersFromDB();

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders.',
      error,
    });
  }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    const result = await OrderService.getOrdersByEmail(email);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order for the user.',
      error,
    });
  }
};

export const OrderController = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrdersByEmail,
};
