"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ofertasController_1 = require("../controllers/ofertasController");
class OfertasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodasOfertas', ofertasController_1.ofertasController.mostrar_todas_ofertas);
    }
}
const ofertasRoutes = new OfertasRoutes();
exports.default = ofertasRoutes.router;
