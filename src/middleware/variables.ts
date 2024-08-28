import { NextFunction, Request, Response } from "express";

export default function (req: Request,res: Response,next: NextFunction) {
	res.locals.isAuth = req.session.isAuthenticated;
	next();
}