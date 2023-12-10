import { Router } from "express";
import { basketsControllers } from "../controllers/basketsControllers";

class BasketsRoutes {
    public router: Router=Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', basketsControllers.getBasket);
        this.router.post('/', basketsControllers.addItem);
        this.router.delete('/', basketsControllers.deleteItem);
        this.router.post('/:id', basketsControllers.buyItem);
    }
}

const basketsRoutes = new BasketsRoutes();
export default basketsRoutes.router;