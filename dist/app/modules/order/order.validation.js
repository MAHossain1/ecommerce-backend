"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodValidation = void 0;
const zod_1 = require("zod");
const createOrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email format' }),
    productId: zod_1.z.string().min(1, 'Product ID is required.'),
    price: zod_1.z.number().min(0, 'Price must be a positive number.'),
    quantity: zod_1.z.number().min(1, 'Quantity must be a positive integer.'),
});
exports.orderZodValidation = { createOrderValidationSchema };
