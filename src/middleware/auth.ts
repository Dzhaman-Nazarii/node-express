import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
	if (!req.session.isAuthenticated) {
		return res.redirect("/auth/login");
	}
	next();
}
