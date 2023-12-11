import { Router } from "express";
import { othersControllers } from "../controllers/othersControllers";

class OthersRoutes {
    public router: Router=Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/categories', othersControllers.getCategories);
        this.router.get('/sales/:id',othersControllers.getSale);
        this.router.get('/sales/',othersControllers.getSales);
        this.router.get('/roles/', othersControllers.getRoles);
    }
}

const othersRoutes = new OthersRoutes();
export default othersRoutes.router;