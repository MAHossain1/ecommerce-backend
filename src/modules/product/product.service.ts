import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getProductsFromDB = async (searchTerm: string) => {
  //   console.log(searchTerm);

  let result: TProduct[];

  if (searchTerm) {
    result = await Product.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { description: { $regex: new RegExp(searchTerm, 'i') } },
      ],
    });
  } else {
    result = await Product.find();
  }

  return result;
};

const getProductsBySearchTerm = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: new RegExp(searchTerm, 'i') } },
      { description: { $regex: new RegExp(searchTerm, 'i') } },
    ],
  });
  return result;
};

const getProductById = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findOneAndDelete({ _id: id });

  return result;
};

export const ProductService = {
  createProductIntoDB,
  getProductsFromDB,
  getProductsBySearchTerm,
  getProductById,
  updateProduct,
  deleteProductFromDB,
};
