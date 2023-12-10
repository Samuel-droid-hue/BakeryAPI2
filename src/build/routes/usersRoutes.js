"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usersControllers_1.usersControllers.getUsers);
        this.router.get('/:id', usersControllers_1.usersControllers.getUser);
        this.router.post('/', usersControllers_1.usersControllers.createUser);
        this.router.put('/:id', usersControllers_1.usersControllers.updateUser);
        this.router.delete('/:id', usersControllers_1.usersControllers.deleteUser);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
