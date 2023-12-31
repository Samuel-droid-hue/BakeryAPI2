"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsControllers_1 = require("../controllers/productsControllers");
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productsControllers_1.productsControllers.getItems);
        this.router.get('/allProducts/', productsControllers_1.productsControllers.getAll);
        this.router.get('/filter/', productsControllers_1.productsControllers.filterItemByCategory);
        this.router.get('/:id', productsControllers_1.productsControllers.getItem);
        this.router.post('/', productsControllers_1.productsControllers.createItem);
        this.router.put('/:id', productsControllers_1.productsControllers.updateItem);
        this.router.delete('/:id', productsControllers_1.productsControllers.deleteItem);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
