import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder): Promise<TOrder | null> => {
  const result = await Order.create(payload);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
