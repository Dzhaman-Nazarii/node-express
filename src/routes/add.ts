import { Request, Response, Router } from "express";
import { Course } from "../models/course.js";
import auth from "../middleware/auth.js";
import { courseValidators } from "../utils/validators.js";
import { validationResult } from "express-validator";

const addRoutes = Router();

addRoutes.get("/", auth, (req: Request, res: Response): void => {
	res.render("add", { title: "Add page", isAdd: true });
});

addRoutes.post(
	"/",
	auth,
	courseValidators,
	async (req: Request, res: Response): Promise<void> => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).render("add", {
				title: "Add course",
				isAdd: true,
				error: errors.array()[0].msg,
				data: {
					title: req.body.title,
					price: req.body.price,
					img: req.body.img,
				},
			});
		}
		const course = new Course({
			title: req.body.title,
			price: req.body.price,
			img: req.body.img,
			userId: req.user,
		});
		try {
			await course.save();
			res.redirect("/courses");
		} catch (error) {
			console.log(error);
		}
		await course.save();
	}
);

export { addRoutes };
