import { z } from 'zod';

const createOrderValidationSchema = z.object({
  email: z.string().min(1, 'Email is required.'),
  productId: z.string().min(1, 'Product ID is required.'),
  price: z.number().min(0, 'Price must be a positive number.'),
  quantity: z.number().min(1, 'Quantity must be a positive integer.'),
});

export const orderZodValidation = { createOrderValidationSchema };
