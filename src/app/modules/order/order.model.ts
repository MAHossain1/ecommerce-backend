import { model, Schema } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';
import { Product } from '../product/product.model';

export const orderSchema = new Schema<TOrder, OrderModel>(
  {
    email: {
      type: String,
      required: [true, 'email is require.'],
    },
    productId: {
      type: Schema.Types.ObjectId,
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

orderSchema.pre('save', async function (next) {
  const order = this as TOrder;

  const product = await Product.findById(order.productId);
  //   console.log(product);

  if (!product) {
    throw new Error('Product not found.');
  }

  if (product.inventory.quantity < order.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // reduce the ordered quantity from the products inventory.
  product.inventory.quantity = product.inventory.quantity - order.quantity;

  // update the instock status based on the remaining inventory quantity.
  product.inventory.inStock = product.inventory.quantity > 0;

  await product.save();

  next();
});

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
