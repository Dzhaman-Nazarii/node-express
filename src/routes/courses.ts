import { Request, Response, Router } from "express";

const coursesRoutes = Router();

coursesRoutes.get("/", (req: Request, res: Response): void => {
	res.render("courses", { title: "Courses page", isCourses: true });
});

export { coursesRoutes };
