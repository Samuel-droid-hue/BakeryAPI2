"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basketsControllers_1 = require("../controllers/basketsControllers");
class BasketsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', basketsControllers_1.basketsControllers.getBasket);
        this.router.post('/', basketsControllers_1.basketsControllers.addItem);
        this.router.delete('/', basketsControllers_1.basketsControllers.deleteItem);
        this.router.post('/:id', basketsControllers_1.basketsControllers.buyItem);
    }
}
const basketsRoutes = new BasketsRoutes();
exports.default = basketsRoutes.router;
