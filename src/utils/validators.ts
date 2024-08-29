import { body } from "express-validator";

export const registerValidators = [
	body("email").isEmail().withMessage("Enter valid email"),
	body("password")
		.isLength({ min: 6, max: 56 })
		.isAlphanumeric()
		.withMessage("The password must contain at least 8 characters"),
	body("confirm").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords must match");
		}
		return true;
	}),
	body("name").isLength({min: 3}).withMessage("Name must contain at least 3 characters"),
];
