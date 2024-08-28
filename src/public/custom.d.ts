import { IUser } from "../models/user.interface";
import session from "express-session";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    isAuthenticated?: boolean;
  }
}

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}