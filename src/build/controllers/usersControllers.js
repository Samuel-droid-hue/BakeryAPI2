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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersControllers = void 0;
const database_1 = __importDefault(require("../database"));
class UsersControllers {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield database_1.default.query(`
            SELECT 
                Users.id, 
                Users.full_name, 
                Users.email,  
                Users.password, 
                Users.phone_number, 
                Users.address, 
                Roles.name AS role
            FROM Users
            JOIN Roles ON Users.role = Roles.id
        `);
            res.json(answer);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const answer = yield database_1.default.query(`
            SELECT 
                Users.id, 
                Users.full_name, 
                Users.email, 
                Users.password, 
                Users.phone_number, 
                Users.address, 
                Roles.name AS role
            FROM Users
            JOIN Roles ON Users.role = Roles.id
            WHERE Users.id = ?
        `, [id]);
            if (answer.length > 0) {
                res.json(answer[0]);
                return;
            }
            res.status(404).json({ 'message': 'Usuario no encontrado!' });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const answer = yield database_1.default.query('INSERT INTO Users set ?', [req.body, id]);
            res.json(answer);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const answer = yield database_1.default.query('UPDATE Users SET ? WHERE id = ?', [req.body, id]);
            res.json(answer);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const answer = yield database_1.default.query(`DELETE FROM Users WHERE id = ?`, [id]);
            res.json(answer);
        });
    }
}
exports.usersControllers = new UsersControllers();
