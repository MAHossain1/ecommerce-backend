import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProductsFromDB);
router.get('/:productId', ProductController.getProductById);
router.put('/:productId', ProductController.updateProduct);

export const ProductRoutes = router;
