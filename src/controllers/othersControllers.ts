import { Request, Response } from "express";
import pool from "../database";

class OthersControllers {
    public async getCategories(req: Request, res: Response): Promise<void> {
        const answer = await pool.query('SELECT * FROM CategoriesItems');
        res.json(answer)
    }

    public async getSale(req: Request, res:Response): Promise<void> {
        const {id} = req.query;            
        const answer = await pool.query('SELECT * FROM Sales WHERE id_client = ?', [id]);
        res.json(answer);
    }

    public async getSales(req: Request, res:Response): Promise<void> {           
        const answer = await pool.query('SELECT * FROM Sales WHERE id_client');
        res.json(answer);
    }
}

export const othersControllers = new OthersControllers();