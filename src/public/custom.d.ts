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

declare module 'connect-mongodb-session' {
  import { Store } from 'express-session';

  interface MongoDBStoreOptions {
    uri: string;
    collection: string;
    connectionOptions?: any;
    expires?: number;
    idField?: string;
    databaseName?: string;
  }

  function connectMongoDBSession(session: any): {
    new (options: MongoDBStoreOptions): Store;
  };

  export = connectMongoDBSession;
}