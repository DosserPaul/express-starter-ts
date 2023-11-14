import {NextFunction, Request, Response} from 'express';

import BaseController from "../BaseController";
import AuthServices from "../../services/AuthServices";
import {errorMessage} from "../../utils/errorMessage";

class RegisterController extends BaseController {
  private data: any;
  private services: AuthServices = new AuthServices();

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public static handle(req: Request, res: Response, next: NextFunction) {
    const controller = new RegisterController(req, res, next);
    controller.execute().catch(next);
  }

  protected async execute(): Promise<void | any> {
    try {
      await this.validate();
      await this.process();
      await this.respond();
    } catch (error) {
      await this.error(error);
    }
  }

  protected async validate(): Promise<void | any> {
    const {email, password, username} = this.req.body;

    if (!email || !password || !username) {
      this.validationError("Please provide an email, a password, a username");
    }

    if (password.length < 8 || password.length > 32) {
      this.validationError("Password must be between 8 and 32 characters long");
    }

    if (username.length < 3 || username.length > 32) {
      this.validationError("Username must be between 3 and 32 characters long");
    }
  }

  protected async process(): Promise<void | any> {
    const { email, password, username } = this.req.body;
    this.data = await this.services.register({email, password, username});
  }

  protected async respond(): Promise<void | any> {
    this.res.status(200).json({
      status: this.data.status,
      message: this.data.payload,
    });
  }

  protected async error(msg: any): Promise<void | any> {
    console.error("error: " + msg)
    errorMessage(this.res, 500, "Something went wrong")
  }
}

export default RegisterController;
