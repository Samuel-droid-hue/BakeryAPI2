import { Request, Response } from "express";
import pool from "../database";

class UsersControllers {
    public async getUsers(req: Request, res: Response): Promise<void> {
        const answer = await pool.query(`
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
    }
    
    public async getUser(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const answer = await pool.query(`
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

        if(answer.length > 0) {
            res.json(answer[0]);
            return;
        }
        res.status(404).json({'message':'Usuario no encontrado!'});
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const {id} = req.query;
        const answer = await pool.query('INSERT INTO Users set ?', [req.body, id]);
        res.json(answer);
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const answer = await pool.query('UPDATE Users SET ? WHERE id = ?', [req.body, id]);
        res.json(answer);
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const {id} = req.query;
        const answer = await pool.query(`DELETE FROM Users WHERE id = ?`, [id]);
        res.json(answer);
    }
}

export const usersControllers = new UsersControllers();