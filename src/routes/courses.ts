import { Request, Response, Router } from "express";
import { Course } from "../models/course.js";

const coursesRoutes = Router();

coursesRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
	const courses = await Course.getAll();
	res.render("courses", { title: "Courses page", isCourses: true, courses });
});

export { coursesRoutes };
