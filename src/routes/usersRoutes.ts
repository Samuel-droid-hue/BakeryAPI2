import { Router } from "express";
import { usersControllers } from "../controllers/usersControllers";

class UsersRoutes {
    public router: Router=Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', usersControllers.getUsers);
        this.router.get('/:id', usersControllers.getUser);
        this.router.post('/', usersControllers.createUser);
        this.router.put('/:id', usersControllers.updateUser);
        this.router.delete('/:id', usersControllers.deleteUser);
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;