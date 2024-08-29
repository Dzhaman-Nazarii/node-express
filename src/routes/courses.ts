import { Request, Response, Router } from "express";
import { Course } from "../models/course.js";
import auth from "../middleware/auth.js";
import { courseValidators } from "../utils/validators.js";
import { validationResult } from "express-validator";

const coursesRoutes = Router();

coursesRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
	try {
		const courses = await Course.find()
			.populate("userId", "email name")
			.select("title price img");
		res.render("courses", {
			title: "Courses page",
			isCourses: true,
			courses,
		});
	} catch (error) {
		console.log(error);
	}
});

coursesRoutes.get(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const course = await Course.findById(req.params.id);
			res.render("course", {
				layout: "empty",
				title: `Course `,
				course,
			});
		} catch (error) {
			console.log(error);
		}
	}
);

coursesRoutes.get(
	"/:id/edit",
	auth,
	async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.query.allow) {
				return res.redirect("/");
			}
			const course = await Course.findById(req.params.id);
			res.render("course-edit", { title: `Edit `, course });
		} catch (error) {
			console.log(error);
		}
	}
);

coursesRoutes.post(
	"/edit",
	auth,
	courseValidators,
	async (req: Request, res: Response): Promise<void> => {
		const errors = validationResult(req);
		const { id } = req.body;
		if (!errors.isEmpty()) {
			return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
		}
		try {
			delete req.body.id;
			await Course.findByIdAndUpdate(id, req.body);
			res.redirect("/courses");
		} catch (error) {
			console.log(error);
		}
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
