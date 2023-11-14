import {NextFunction, Request, Response} from 'express';

import BaseController from "../BaseController";
import AuthServices from "../../services/AuthServices";
import {errorMessage} from "../../utils/errorMessage";

class LoginController extends BaseController {
  private data: any;
  private services: AuthServices = new AuthServices();

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public static handle(req: Request, res: Response, next: NextFunction) {
    const controller = new LoginController(req, res, next);
    controller.execute().catch(next);

  }

  protected async execute(): Promise<void | any> {
    try {
      await this.validate();
      await this.process();
      await this.respond();
    } catch (error) {
      await this.error();
    }
  }

  protected async validate(): Promise<void | any> {
    const {email, password} = this.req.body;

    if (!email || !password) {
      return errorMessage(this.res, 400, 'Invalid request data');
    }
  }

  protected async process(): Promise<void | any> {
    const {email, password} = this.req.body;

    this.data = await this.services.login(email, password);
  }

  protected async respond(): Promise<void | any> {
    if (!this.data || this.data.status === 'error') {
      return errorMessage(this.res, 400, this.data ? this.data.error : 'Invalid request data');
    }

    this.res.status(200).json({
      status: this.data.status,
      user: this.data.payload.user
    });
  }

  protected async error(): Promise<void | any> {
    errorMessage(this.res, 500, "Something went wrong");
  }
}

export default LoginController;
