import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(1, 'Type is required.'),
  value: z.string().min(1, 'Value is required.'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be a positive number.'),
  inStock: z.boolean(),
});

const createProductValidationSchema = z.object({
  name: z.string().min(1, 'Product name is required.'),
  description: z.string().min(1, 'Product description is required.'),
  price: z.number().min(0, 'Price must be a positive number.'),
  category: z.string().min(1, 'Category is required.'),
  tags: z
    .array(z.string().min(1, 'Each tag must be a non-empty string.'))
    .min(1, 'At least one tag is required.'),
  variants: z.array(variantValidationSchema).min(1, 'Variants are required.'),
  inventory: inventoryValidationSchema,
});

export const ProductZodValidation = {
  createProductValidationSchema,
};
