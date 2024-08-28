import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import sendgrid from "nodemailer-sendgrid-transport";
import registrationEmail from "../emails/registration.js";
import resetEmail from "../emails/reset.js";

dotenv.config();
const transporter = nodemailer.createTransport(
	sendgrid({
		auth: {
			api_key: process.env.SENDGRID_API_KEY as string,
		},
	})
);

const authRoutes = Router();

authRoutes.get("/login", (req: Request, res: Response) => {
	res.render("auth/login", {
		title: "Authorization",
		isLogin: true,
		loginError: req.flash("loginError"),
		registerError: req.flash("registerError"),
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
			} else {
				req.flash("loginError", "Password is incorrect");
				res.redirect("/auth/login#login");
			}
		} else {
			req.flash("loginError", "No such user exists");
			res.redirect("/auth/login#login");
		}
	} catch (error) {
		console.error(error);
		res.status(500).redirect("/auth/login#login");
	}
});

authRoutes.get("/logout", (req: Request, res: Response) => {
	req.session.destroy((error) => {
		if (error) {
			console.error(error);
			return res.status(500).redirect("/auth/login#login");
		}
		res.redirect("/auth/login#login");
	});
});

authRoutes.post("/register", async (req: Request, res: Response) => {
	try {
		const { email, password, name, repeat } = req.body;
		const candidate = await User.findOne({ email });

		if (candidate) {
			req.flash("registerError", "User already exists");
			return res.redirect("/auth/login#register");
		}

		if (password === repeat) {
			req.flash("registerError", "Passwords do not match");
			return res.redirect("/auth/login#register");
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({
			email,
			name,
			password: hashPassword,
			card: { items: [] },
		});

		await user.save();
		await transporter.sendMail(registrationEmail(email));
		res.redirect("/auth/login#login");
	} catch (error) {
		console.error(error);
		res.status(500).redirect("/auth/login#register");
	}
});

authRoutes.get("/reset", (req: Request, res: Response) => {
	res.render("auth/reset", {
		title: "Forget your password?",
		resetError: req.flash("resetError"),
	});
});

authRoutes.post("/reset", (req: Request, res: Response) => {
	try {
		crypto.randomBytes(32, async (error, buffer) => {
			if (error) {
				req.flash(
					"resetError",
					"Something went wrong, try again later"
				);
				return res.redirect("/auth/reset");
			}
			const token = buffer.toString("hex");
			const candidate = await User.findOne({ email: req.body.email });
			if (candidate) {
				candidate.resetToken = token;
				candidate.resetTokenExp = new Date(Date.now() + 60 * 60 * 1000);
				await candidate.save();
				await transporter.sendMail(resetEmail(candidate.email, token));
				res.redirect("/auth/login#login")
			} else {
				req.flash("resetError", "There is no such email");
				return res.redirect("/auth/reset");
			}
		});
	} catch (error) {
		console.log(error);
	}
});

export { authRoutes };
