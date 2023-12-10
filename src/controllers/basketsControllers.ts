import { Request, Response } from "express";
import pool from "../database";

class BasketsControllers {
    public async getBasket(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const answer = await pool.query(`SELECT 
            BakeryItems.name, BakeryItems.price, Baskets.quantity
            FROM Baskets
            JOIN BakeryItems ON Baskets.product_id = BakeryItems.id
            WHERE Baskets.client_id = ?;`, [id]);
        if(answer.length > 0) {
            res.json(answer);
            return;
        }
        res.status(404).json({'message':'El carrito se encuentra vacio!'});
    }

    public async addItem(req: Request, res: Response): Promise<void> {
        const {id_client, id_product, quantity} = req.query;
        const answer = await pool.query(`INSERT INTO Baskets (client_id, product_id, quantity)
        VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?`, [id_client, id_product, quantity, quantity]);
        res.json(answer);
    }

    public async deleteItem(req: Request, res:Response): Promise<void> {
        const {id_client, id_product} = req.query;
        const answer = await pool.query('DELETE FROM Baskets WHERE client_id = ? AND product_id = ?', [id_client, id_product]);
        res.json(answer);
    }

    public async buyItem(req: Request, res:Response): Promise<void> {
        const {id_client} = req.query;
        const basketQuery = await pool.query(`SELECT Baskets.client_id, Baskets.product_id, Baskets.quantity, BakeryItems.price FROM Baskets 
        JOIN BakeryItems ON Baskets.product_id = BakeryItems.id 
        WHERE client_id = ?`, [id_client]);

        if(basketQuery.length > 0) {
            let total = 0;
            for (const i of basketQuery) {
                total += i.quantity * i.price;
            }
            
            const insertQuery = await pool.query(`INSERT INTO Sales (id_client, total) VALUES (?, ?)`, [id_client, total]);

            const deleteQuery = await pool.query(`DELETE FROM Baskets WHERE client_id = ?`, [id_client]);

            res.json(insertQuery);
        }
    }
}

export const basketsControllers = new BasketsControllers();