import { body } from "express-validator";
import { User } from "../models/user.js";

export const registerValidators = [
	body("email")
		.isEmail()
		.withMessage("Enter valid email")
		.custom(async (value, { req }) => {
			try {
				const user = await User.findOne({ email: value });
				if (user) {
					return Promise.reject("This email is taken");
				}
			} catch (error) {
				console.log(error);
			}
		})
		.normalizeEmail(),
	body("password")
		.isLength({ min: 6, max: 56 })
		.isAlphanumeric()
		.trim()
		.withMessage("The password must contain at least 8 characters"),
	body("confirm")
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords must match");
			}
			return true;
		})
		.trim(),
	body("name")
		.isLength({ min: 3 })
		.withMessage("Name must contain at least 3 characters")
		.trim(),
];
