import { Request, Response, Router } from "express";
import { Course } from "../models/course.js";
import auth from '../middleware/auth.js';

const addRoutes = Router();

addRoutes.get("/", auth, (req: Request, res: Response): void => {
	res.render("add", { title: "Add page", isAdd: true });
});

addRoutes.post("/", auth, async (req: Request, res: Response): Promise<void> => {
	const course = new Course({
		title: req.body.title, price: req.body.price, img: req.body.img, userId: req.user
	})
	try {
		await course.save();
		res.redirect("/courses");
	} catch (error) {
		console.log(error);
	}
	await course.save();
});

export { addRoutes };
