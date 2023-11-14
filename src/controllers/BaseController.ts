import {NextFunction, Request, Response} from 'express';

export default abstract class BaseController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;
  protected token: string | undefined;

  protected constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  protected abstract execute(): Promise<void | any>;

  protected abstract validate(): Promise<void | any>;

  protected abstract process(): Promise<void | any>;

  protected abstract respond(): Promise<void | any>;

  protected abstract error(msg: any): Promise<void | any>;

  protected validationError(message: string, statusCode: number = 400) {
    this.res.status(statusCode).json({
      status: "error",
      error: message
    });
  }
}
