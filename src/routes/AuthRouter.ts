import BaseRouter from "./BaseRouter";
import RegisterController from "../controllers/Auth/RegisterController";
import LoginController from "../controllers/Auth/LoginController";

class AuthRouter extends BaseRouter {
  constructor() {
    super();
    this.routes();
  }

  protected routes(): void {
    this.router.post("/login", LoginController.handle);
    this.router.post("/register", RegisterController.handle);
  }
}

export default new AuthRouter().router;
