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
exports.productsControllers = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsControllers {
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield database_1.default.query(`SELECT 
            BakeryItems.id, 
            BakeryItems.name, 
            BakeryItems.description, 
            BakeryItems.price, 
            BakeryItems.quantity_available, 
            CategoriesItems.name AS category
        FROM BakeryItems
        JOIN CategoriesItems ON BakeryItems.category = CategoriesItems.id
        WHERE BakeryItems.quantity_available > 0`);
            res.json(answer);
        });
    }
    getItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const answer = yield database_1.default.query(`SELECT 
            BakeryItems.id, 
            BakeryItems.name, 
            BakeryItems.description, 
            BakeryItems.price, 
            BakeryItems.quantity_available, 
            CategoriesItems.name AS category
        FROM BakeryItems
        JOIN CategoriesItems ON BakeryItems.category = CategoriesItems.id
        WHERE BakeryItems.id = ? AND BakeryItems.quantity_available > 0`, [id]);
            if (answer.length > 0) {
                res.json(answer[0]);
                return;
            }
            res.status(404).json({ 'message': 'Producto no existente en exhibicion!' });
        });
    }
    createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const answer = yield database_1.default.query('INSERT INTO BakeryItems set ?', [req.body, id]);
            res.json(answer);
        });
    }
    updateItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const answer = yield database_1.default.query('UPDATE BakeryItems SET ? WHERE id = ?', [req.body, id]);
            res.json(answer);
        });
    }
    deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const answer = yield database_1.default.query(`DELETE FROM BakeryItems WHERE id = ${id}`);
            res.json(answer);
        });
    }
    filterItemByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category } = req.params;
            const answer = yield database_1.default.query(`SELECT
            BakeryItems.id, 
            BakeryItems.name, 
            BakeryItems.description, 
            BakeryItems.price, 
            BakeryItems.quantity_available, 
            CategoriesItems.name AS category
            FROM BakeryItems
            JOIN CategoriesItems ON BakeryItems.category = CategoriesItems.id
            WHERE BakeryItems.quantity_available > 0 AND BakeryItems.category = ?`, [category]);
            if (answer.length > 0) {
                res.json(answer[0]);
                return;
            }
            res.status(404).json({ 'message': 'No existen productos de esta categoria!' });
        });
    }
}
exports.productsControllers = new ProductsControllers();
