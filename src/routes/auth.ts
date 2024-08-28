import { Request, Response, Router } from "express";

const authRoutes = Router();

authRoutes.get("/login", async (req: Request, res: Response) => {
	res.render("auth/login", {
		title: "Authorization",
		isLogin: true,
	})
})

export {authRoutes};