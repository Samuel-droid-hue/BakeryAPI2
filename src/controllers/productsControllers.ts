import { Request, Response } from "express";
import pool from "../database";

class ProductsControllers {
    public async getItems(req: Request, res: Response): Promise<void> {
        const answer = await pool.query(`SELECT 
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
    }

    public async getItem(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const answer = await pool.query(`SELECT 
            BakeryItems.id, 
            BakeryItems.name, 
            BakeryItems.description, 
            BakeryItems.price, 
            BakeryItems.quantity_available, 
            CategoriesItems.name AS category
        FROM BakeryItems
        JOIN CategoriesItems ON BakeryItems.category = CategoriesItems.id
        WHERE BakeryItems.id = ? AND BakeryItems.quantity_available > 0`, [id]);
        if(answer.length > 0) {
            res.json(answer[0]);
            return;
        }
        res.status(404).json({'message':'Producto no existente en exhibicion!'});
    }

    public async createItem(req: Request, res: Response): Promise<void> {
        const {id} = req.body;
        const answer = await pool.query('INSERT INTO BakeryItems set ?', [req.body, id]);
        res.json(answer);
    }

    public async updateItem(req: Request, res:Response): Promise<void> {
        const {id} = req.params;
        const answer = await pool.query('UPDATE BakeryItems SET ? WHERE id = ?', [req.body, id]);
        res.json(answer);
    }

    public async deleteItem(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const answer = await pool.query(`DELETE FROM BakeryItems WHERE id = ${id}`);
        res.json(answer);
    }

    public async filterItemByCategory(req: Request, res: Response): Promise<void> {
        const {category} = req.params;
        const answer = await pool.query(`SELECT
            BakeryItems.id, 
            BakeryItems.name, 
            BakeryItems.description, 
            BakeryItems.price, 
            BakeryItems.quantity_available, 
            CategoriesItems.name AS category
            FROM BakeryItems
            JOIN CategoriesItems ON BakeryItems.category = CategoriesItems.id
            WHERE BakeryItems.quantity_available > 0 AND BakeryItems.category = ?`, [category]);
            if(answer.length > 0) {
                res.json(answer[0]);
                return;
            }
            res.status(404).json({'message':'No existen productos de esta categoria!'});
    }

    public async getAllItems(req: Request, res: Response): Promise<void> {
        const answer = await pool.query(`SELECT 
            BakeryItems.id, 
            BakeryItems.name, 
            BakeryItems.description, 
            BakeryItems.price, 
            BakeryItems.quantity_available, 
            CategoriesItems.name AS category
        FROM BakeryItems
        JOIN CategoriesItems ON BakeryItems.category = CategoriesItems.id`);
        res.json(answer);
    }
}

export const productsControllers = new ProductsControllers();