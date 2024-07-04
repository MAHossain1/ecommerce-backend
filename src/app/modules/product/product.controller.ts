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
    const searchTerm = req.query.searchTerm as string;

    const result = await ProductService.getProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products.',
      error,
    });
  }
};
const getProductsBySearchTerm = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    const result = await ProductService.getProductsBySearchTerm(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products.',
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
      message: 'Failed to retrieve product.',
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body.product;

    const updateZodValidateData =
      ProductZodValidation.updateProductValidationSchema.parse(productData);

    const result = await ProductService.updateProduct(
      productId,
      updateZodValidateData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product.',
      error,
    });
  }
};

const deleteProductFromDB = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await ProductService.deleteProductFromDB(productId);

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product.',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getProductsFromDB,
  getProductsBySearchTerm,
  getProductById,
  updateProduct,
  deleteProductFromDB,
};
