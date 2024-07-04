import { z } from 'zod';

const createOrderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  productId: z.string().min(1, 'Product ID is required.'),
  price: z.number().min(0, 'Price must be a positive number.'),
  quantity: z.number().min(1, 'Quantity must be a positive integer.'),
});

export const orderZodValidation = { createOrderValidationSchema };
