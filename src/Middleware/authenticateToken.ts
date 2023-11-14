import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";

dotenv.config();

interface IUser {
  id: number;
  username: string;
  email: string;
}


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {

    if (err) return res.sendStatus(403)

    next()
  })
}
