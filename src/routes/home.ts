import {Request, Response, Router} from "express";

const homeRoutes = Router();

homeRoutes.get("/", (req: Request, res: Response): void => {
	res.render("index", {title: "Home page", isHome: true});
});

export {homeRoutes};