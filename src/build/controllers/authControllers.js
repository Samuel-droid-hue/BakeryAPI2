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
exports.authControllers = void 0;
const database_1 = __importDefault(require("../database"));
class AuthControllers {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.query;
            console.log(req.query);
            const answer = yield database_1.default.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password]);
            console.log(answer);
            if (answer.length > 0) {
                res.json(answer[0]);
                return;
            }
            res.status(404).json({ 'message': 'Usuario no encontrado o credenciales incorrectas!' });
        });
    }
}
exports.authControllers = new AuthControllers();
