import { model, Schema } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Type is required.'],
  },
  value: {
    type: String,
    required: [true, 'Value is required.'],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

export const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
    },
    variants: {
      type: [variantSchema],
      required: [true, 'Variants is required.'],
    },
    inventory: {
      type: inventorySchema,
      required: [true, 'Inventory is required.'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

productSchema.post('findOneAndDelete', async function (doc) {
  if (!doc) {
    return null;
  }
  return null;
});

export const Product = model<TProduct, ProductModel>('Product', productSchema);
