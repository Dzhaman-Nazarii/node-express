import { Request, Response, Router } from "express";
import auth from "../middleware/auth.js";
import { User } from "../models/user.js";

const profileRoutes = Router();

interface ProfileUpdate {
	name: string;
	avatarUrl?: string;
}

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

profileRoutes.post(
	"/",
	auth,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const user = await User.findById(req.user?._id);
			if (user) {
				const toChange: ProfileUpdate = {
					name: req.body.name,
				};

				if (req.file) {
					toChange.avatarUrl = req.file.path;
				}

				Object.assign(user, toChange);
				await user.save();
				res.redirect("/profile");
			} else {
				res.redirect("/profile");
			}
		} catch (error) {
			console.error(error);
		}
	}
);

export { profileRoutes };