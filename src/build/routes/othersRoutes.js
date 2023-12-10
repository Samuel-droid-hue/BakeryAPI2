"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const othersControllers_1 = require("../controllers/othersControllers");
class OthersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/categories', othersControllers_1.othersControllers.getCategories);
        this.router.get('/sales/:id', othersControllers_1.othersControllers.getSale);
        this.router.get('/sales/', othersControllers_1.othersControllers.getSales);
    }
}
const othersRoutes = new OthersRoutes();
exports.default = othersRoutes.router;
