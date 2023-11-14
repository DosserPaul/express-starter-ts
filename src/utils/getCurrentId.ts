import jwt from 'jsonwebtoken';
import {Request} from 'express';
import dotenv from 'dotenv';

dotenv.config();

function getCurrentUserId(req: Request): number {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = req.headers.authorization?.split(' ')[1] as string;
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    return decodedToken.id;
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return -1;
  }
}

export default getCurrentUserId;
