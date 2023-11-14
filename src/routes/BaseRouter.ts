import {Router} from "express";

export default abstract class BaseRouter {
    public router: Router;
    public path: string;
    protected controller: any;

    protected constructor() {
        this.router = Router();
        this.path = "/api";
        this.controller = null;

        this.routes();
    }

    protected abstract routes(): void;
}
