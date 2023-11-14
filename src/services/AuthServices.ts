import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

import * as dotenv from "dotenv";
import {IAPIResponse} from "../interfaces/IAPIResponse";

dotenv.config();

interface UserPayload {
  email: string;
  password: string;
  username: string;
}

class AuthServices {
  private prisma: PrismaClient;
  public jwtSecret: string;

  constructor() {
    this.prisma = new PrismaClient();
    this.jwtSecret = process.env.JWT_SECRET || "secret";
  }

  public async login(email: string, password: string): Promise<IAPIResponse> {
    return {
      status: true,
      payload: {
        message: "Login successful",
      }
    }
  }

  public async register({email, password, username}: UserPayload): Promise<IAPIResponse> {
    return {
      status: true,
      payload: {
        message: "Registration successful",
      }
    }
  }
}

export default AuthServices;
