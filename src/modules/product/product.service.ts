import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getProductsFromDB,
};
