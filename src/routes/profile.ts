import { Request, Response, Router } from "express";
import auth from "../middleware/auth.js";

const profileRoutes = Router();

profileRoutes.get(
	"/",
	auth,
	async (req: Request, res: Response): Promise<void> => {
		res.render("profile", {
			title: "Profile",
			isProfile: true,
			user: req.user?.toObject(),
		});
	}
);

profileRoutes.get(
	"/",
	auth,
	async (req: Request, res: Response): Promise<void> => {
		
	}
);

export { profileRoutes };
