import { Router } from "express";
import { productsControllers } from "../controllers/productsControllers";

class ProductsRoutes {
    public router: Router=Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', productsControllers.getItems);
        this.router.get('/allProducts/', productsControllers.getAll);
        this.router.get('/filter/', productsControllers.filterItemByCategory);
        this.router.get('/:id', productsControllers.getItem);
        this.router.post('/', productsControllers.createItem);
        this.router.put('/:id', productsControllers.updateItem);
        this.router.delete('/:id', productsControllers.deleteItem);
        
        
    }
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;