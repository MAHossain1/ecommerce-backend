import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProductsFromDB);
router.get('/', ProductController.getProductsBySearchTerm);
router.get('/:productId', ProductController.getProductById);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProductFromDB);

export const ProductRoutes = router;
