import { Request, Response } from 'express';
import { ProductService } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body.product;
    const result = await ProductService.createProductIntoDB(productData);

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
