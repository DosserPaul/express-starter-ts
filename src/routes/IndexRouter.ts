import {Router} from "express";
import IndexController from "../controllers/IndexController";
import AuthRouter from "./AuthRouter";
import {authenticateToken} from "../Middleware/authenticateToken";

class IndexRouter {
    public router: Router;
    public path: string;
    public indexController: IndexController = new IndexController();

    constructor() {
        this.router = Router();
        this.path = "/api";

        this.routes();
    }

    private routes(): void {
        // Auth routes
        this.router.use("/auth", AuthRouter);

        // Default route
        this.router.get("/", this.indexController.index);
        this.router.get("*", this.indexController.notFound);
    }
}

export default new IndexRouter().router;
