import {NextFunction, Request, Response} from 'express';

class IndexController {
    public index = (req: Request, res: Response, next: NextFunction): void => {
        try {
            res.status(200).send({
                version: '1.0.0',
                message: 'Welcome to the My Chat API'
            });
        } catch (error) {
            next(error);
        }
    };

    public notFound = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(404).send({
                message: 'Not Found'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default IndexController;
