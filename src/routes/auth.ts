import { Request, Response, Router } from "express";
import { User } from "../models/user.js";

const authRoutes = Router();

authRoutes.get("/login", async (req: Request, res: Response) => {
	res.render("auth/login", {
		title: "Authorization",
		isLogin: true,
	});
});

authRoutes.post("/login", async (req: Request, res: Response) => {
	const user = await User.findById("66cca40cbe84546dc77444b4").exec();
	req.session.user = user;
	req.session.isAuthenticated = true;
	req.session.save((error) => {
		if (error) {
			throw error;
		}
		res.redirect("/");
	});
});

authRoutes.get("/logout", async (req: Request, res: Response) => {
	req.session.destroy(() => {
		res.redirect("/auth/login#login");
	});
});

export { authRoutes };
