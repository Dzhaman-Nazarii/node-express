import {Request, Response, Router} from "express";

const addRoutes = Router();

addRoutes.get("/", (req: Request, res: Response): void => {
	res.render("index", {title: "Add page", isAdd: true});
});

export {addRoutes};