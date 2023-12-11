import { Request, Response } from "express";
import pool from "../database";

class AuthControllers {
    public async getUsers(req: Request, res: Response): Promise<void> {
        const {email, password} = req.query;
        console.log(req.query);
        const answer = await pool.query('SELECT * FROM Users WHERE email = :email AND password = :password', { email, password });
        console.log(answer);
        if(answer.length > 0) {
            res.json(answer[0]);
            return;
        }
        res.status(404).json({'message':'Usuario no encontrado o credenciales incorrectas!'});
    }
}

export const authControllers = new AuthControllers();