import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder): Promise<TOrder | null> => {
  //   console.log(payload);

  const result = await Order.create(payload);
  return result;
};

const getOrdersFromDB = async (): Promise<TOrder[] | null> => {
  const result = await Order.find();
  return result;
};

const getOrdersByEmail = async (email: string): Promise<TOrder[] | null> => {
  let result: TOrder[];

  if (email) {
    result = await Order.find({ email });
  } else {
    result = await Order.find();
  }
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrdersByEmail,
};
