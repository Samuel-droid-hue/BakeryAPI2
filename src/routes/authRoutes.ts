import { Router } from "express";
import { authControllers } from "../controllers/authControllers";

class AuthRoutes {
    public router: Router=Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', authControllers.getUsers);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;