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

export const ProductController = {
  createProduct,
};
