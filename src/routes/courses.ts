import { Request, Response, Router } from "express";

const coursesRoutes = Router();

coursesRoutes.get("/", (req: Request, res: Response): void => {
	res.render("index", { title: "Courses page", isCourses: true });
});

export { coursesRoutes };
