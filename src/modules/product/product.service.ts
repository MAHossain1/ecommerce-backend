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

const getProductById = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getProductsFromDB,
  getProductById,
};
