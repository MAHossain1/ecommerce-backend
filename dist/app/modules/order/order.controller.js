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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const createOrderIntoDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body.order;
        // console.log(orderData);
        const parsedOrderData = order_validation_1.orderZodValidation.createOrderValidationSchema.parse(orderData);
        // console.log(parsedOrderData);
        const result = yield order_service_1.OrderService.createOrderIntoDB(parsedOrderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully.',
            data: result,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: 'Failed to create order.',
            error: err.message,
        });
    }
});
const getOrdersFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getOrdersFromDB();
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully.',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve orders.',
            error,
        });
    }
});
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.OrderService.getOrdersByEmail(email);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve order for the user.',
            error,
        });
    }
});
exports.OrderController = {
    createOrderIntoDB,
    getOrdersFromDB,
    getOrdersByEmail,
};
