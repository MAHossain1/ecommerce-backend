"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'Type is required.'],
    },
    value: {
        type: String,
        required: [true, 'Value is required.'],
    },
}, { _id: false });
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
}, { _id: false });
exports.productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
    },
    variants: {
        type: [variantSchema],
        required: [true, 'Variants is required.'],
    },
    inventory: {
        type: inventorySchema,
        required: [true, 'Inventory is required.'],
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
exports.productSchema.post('findOneAndDelete', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!doc) {
            return null;
        }
        return null;
    });
});
exports.Product = (0, mongoose_1.model)('Product', exports.productSchema);
