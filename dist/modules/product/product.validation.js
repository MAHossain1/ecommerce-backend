"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductZodValidation = void 0;
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Type is required.'),
    value: zod_1.z.string().min(1, 'Value is required.'),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, 'Quantity must be a positive number.'),
    inStock: zod_1.z.boolean(),
});
const createProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Product name is required.'),
    description: zod_1.z.string().min(1, 'Product description is required.'),
    price: zod_1.z.number().min(0, 'Price must be a positive number.'),
    category: zod_1.z.string().min(1, 'Category is required.'),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, 'Each tag must be a non-empty string.'))
        .min(1, 'At least one tag is required.'),
    variants: zod_1.z.array(variantValidationSchema).min(1, 'Variants are required.'),
    inventory: inventoryValidationSchema,
});
const updateProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Product name is required.').optional(),
    description: zod_1.z.string().min(1, 'Product description is required.').optional(),
    price: zod_1.z.number().min(0, 'Price must be a positive number.').optional(),
    category: zod_1.z.string().min(1, 'Category is required.').optional(),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, 'Each tag must be a non-empty string.'))
        .min(1, 'At least one tag is required.')
        .optional(),
    variants: zod_1.z
        .array(variantValidationSchema)
        .min(1, 'Variants are required.')
        .optional(),
    inventory: inventoryValidationSchema.optional(),
});
exports.ProductZodValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
