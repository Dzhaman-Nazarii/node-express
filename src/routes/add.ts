import { Request, Response, Router } from "express";
import { Course } from "../models/course.js";

const addRoutes = Router();

addRoutes.get("/", (req: Request, res: Response): void => {
	res.render("add", { title: "Add page", isAdd: true });
});

addRoutes.post("/", async (req: Request, res: Response): Promise<void> => {
	// const course = new Course(req.body.title, req.body.price, req.body.img);
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
