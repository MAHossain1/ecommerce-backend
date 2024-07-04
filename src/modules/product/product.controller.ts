import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ProductZodValidation } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body.product;

    // product validation using zod
    const zodValidateData =
      ProductZodValidation.createProductValidationSchema.parse(productData);

    const result = await ProductService.createProductIntoDB(zodValidateData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product.',
      error,
    });
  }
};

const getProductsFromDB = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieved products.',
      error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductService.getProductById(productId);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieved products.',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getProductsFromDB,
  getProductById,
};
