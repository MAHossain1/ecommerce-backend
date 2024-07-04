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
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
exports.orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'email is require.'],
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'ProductId is require.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is require.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is require.'],
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
exports.orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        const product = yield product_model_1.Product.findById(order.productId);
        //   console.log(product);
        if (!product) {
            throw new Error('Product not found.');
        }
        if (product.inventory.quantity < order.quantity) {
            throw new Error('Insufficient quantity available in inventory');
        }
        // reduce the ordered quantity from the products inventory.
        product.inventory.quantity = product.inventory.quantity - order.quantity;
        // update the instock status based on the remaining inventory quantity.
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        next();
    });
});
exports.Order = (0, mongoose_1.model)('Order', exports.orderSchema);
