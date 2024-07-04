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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body.product;
        // product validation using zod
        const zodValidateData = product_validation_1.ProductZodValidation.createProductValidationSchema.parse(productData);
        const result = yield product_service_1.ProductService.createProductIntoDB(zodValidateData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully.',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create product.',
            error,
        });
    }
});
const getProductsFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductService.getProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully.',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve products.',
            error,
        });
    }
});
const getProductsBySearchTerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductService.getProductsBySearchTerm(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully.',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve products.',
            error,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductService.getProductById(productId);
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully.',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve product.',
            error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const productData = req.body.product;
        const updateZodValidateData = product_validation_1.ProductZodValidation.updateProductValidationSchema.parse(productData);
        const result = yield product_service_1.ProductService.updateProduct(productId, updateZodValidateData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update product.',
            error,
        });
    }
});
const deleteProductFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const deletedProduct = yield product_service_1.ProductService.deleteProductFromDB(productId);
        if (!deletedProduct) {
            res.status(404).json({
                success: false,
                message: 'Product not found.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully.',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete product.',
            error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getProductsFromDB,
    getProductsBySearchTerm,
    getProductById,
    updateProduct,
    deleteProductFromDB,
};
