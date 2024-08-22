import { Request, Response, Router } from "express";
import { Course } from "../models/course.js";

const coursesRoutes = Router();

coursesRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
	const courses = await Course.getAll();
	res.render("courses", { title: "Courses page", isCourses: true, courses });
});

coursesRoutes.get(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		const course = await Course.getById(req.params.id);
		res.render("course", {layout: "empty", title: `Course ${course.title}`, course });
	}
);

coursesRoutes.get(
	"/:id/edit",
	async (req: Request, res: Response): Promise<void> => {
		if(!req.query.allow) {
			return res.redirect("/");
		}	
		const course = await Course.getById(req.params.id);
		res.render("course-edit", {title: `Edit ${course.title}`, course})
	}
);

coursesRoutes.post(
	"/edit",
	async (req: Request, res: Response): Promise<void> => {
		await Course.updateById(req.body);
		res.redirect("/courses");
	}
);

export { coursesRoutes };
