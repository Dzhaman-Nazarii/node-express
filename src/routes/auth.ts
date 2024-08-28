import { Request, Response, Router } from "express";
import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';

const authRoutes = Router();

authRoutes.get("/login", async (req: Request, res: Response) => {
	res.render("auth/login", {
		title: "Authorization",
		isLogin: true,
	});
});

authRoutes.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const candidate = await User.findOne({ email });

		if (candidate) {
			const isSame = await bcrypt.compare(password, candidate.password);
			if (isSame) {
				req.session.user = candidate;
				req.session.isAuthenticated = true;
				req.session.save((error) => {
					if (error) {
						console.error(error);
						return res.status(500).redirect("/auth/login#login");
					}
					return res.redirect("/");
				});
				return;
			}
		}
		res.redirect("/auth/login#login");
	} catch (error) {
		console.error(error);
		res.status(500).redirect("/auth/login#login");
	}
});

authRoutes.get("/logout", async (req: Request, res: Response) => {
	req.session.destroy(() => {
		res.redirect("/auth/login#login");
	});
});

authRoutes.post("/register", async (req: Request, res: Response) => {
	try {
		const { email, password, name, repeat } = req.body;
		const candidate = await User.findOne({ email });
		if (candidate) {
			res.redirect("/auth/login#register");
		}
		const hashPassword = await bcrypt.hash(password, 10)
		const user = new User({
			email,
			name,
			password: hashPassword,
			card: { items: [] },
		});
		await user.save();
		res.redirect("/auth/login#login");
	} catch (error) {
		console.log(error);
	}
});

export { authRoutes };
