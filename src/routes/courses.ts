import { Request, Response, Router } from "express";
import { Course } from "../models/course.js";
import auth from '../middleware/auth.js';

const coursesRoutes = Router();

coursesRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
	const courses = await Course.find()
		.populate("userId", "email name")
		.select("title price img");
	res.render("courses", { title: "Courses page", isCourses: true, courses });
});

coursesRoutes.get(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		const course = await Course.findById(req.params.id);
		res.render("course", {
			layout: "empty",
			title: `Course `,
			course,
		});
	}
);

coursesRoutes.get(
	"/:id/edit",
	auth,
	async (req: Request, res: Response): Promise<void> => {
		if (!req.query.allow) {
			return res.redirect("/");
		}
		const course = await Course.findById(req.params.id);
		res.render("course-edit", { title: `Edit `, course });
	}
);

coursesRoutes.post(
	"/edit",
	auth,
	async (req: Request, res: Response): Promise<void> => {
		const { id } = req.body;
		delete req.body.id;
		await Course.findByIdAndUpdate(id, req.body);
		res.redirect("/courses");
	}
);

coursesRoutes.post(
	"/remove",
	auth,
	async (req: Request, res: Response): Promise<void> => {
		try {
			await Course.deleteOne({
				_id: req.body.id,
			});
			res.redirect("/courses");
		} catch (error) {
			console.log(error);
		}
	}
);

export { coursesRoutes };
