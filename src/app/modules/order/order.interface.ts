import { Model, ObjectId } from 'mongoose';

export type TOrder = {
  email: string;
  productId: ObjectId;
  price: number;
  quantity: number;
};

export type OrderModel = Model<TOrder, Record<string, unknown>>;
