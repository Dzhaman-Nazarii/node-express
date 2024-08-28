import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { IUser } from "../models/user.interface";

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
  ) {
	if (!req.session.user) {
	  return next();
	}
  
	const user = await User.findById(req.session.user._id) as IUser | null;
	if (user) {
	  req.user = user;
	}
	
	next();
  }