import { model, Schema } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';

export const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'email is require.'],
    },
    productId: {
      type: String,
      required: [true, 'ProductId is require.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is require.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is require.'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
