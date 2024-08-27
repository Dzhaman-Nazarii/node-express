import { Router } from "express";
import { Request, Response } from "express";
import { Course } from "../models/course.js";
import { ICourse } from "../models/course.interface.js";
import { ICardItem } from "../models/user.interface.js";

const cardRoutes = Router();

cardRoutes.post("/add", async (req: Request, res: Response): Promise<void> => {
	try {
		const course = await Course.findById(req.body.id);

		if (course && req.user) {
			await req.user.addToCard(course as ICourse);
			res.redirect("/card");
		} else {
			res.status(404).send("Course not found");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred");
	}
});

cardRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
	try {
		const user = (await req.user?.populate("card.items.courseId")) as {
			card: { items: ICardItem[] } | undefined;
		};

		if (!user || !user.card) {
			res.status(404).send("User or card not found");
			return;
		}

		const courses = user.card.items.map((c: ICardItem) => {
			const course = c.courseId as unknown as ICourse & { _doc: ICourse };
			return {
				...course._doc,
        id: c.courseId.id,
				count: c.count,
			};
		});

		const totalPrice = courses.reduce((total, course) => {
			return (total += course.price * course.count);
		}, 0);

		res.render("card", {
			title: "Card",
			isCard: true,
			courses: courses,
			price: totalPrice,
		});
	} catch (error) {
		console.error("Error in /card route:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

cardRoutes.delete(
	"/remove/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			await req.user?.removeFromCard(req.params.id);

			const user = await req.user?.populate("card.items.courseId");

			if (!user || !user.card) {
				res.status(404).send("User or card not found");
				return;
			}

			const courses = user.card.items.map((c: ICardItem) => {
				const course = c.courseId as unknown as ICourse & { _doc: ICourse };
				return {
					...course._doc,
					id: c.courseId.id,
					count: c.count,
				};
			});

			const totalPrice = courses.reduce((total, course) => {
				return (total += course.price * course.count);
			}, 0);

			const card = {
				courses,
				price: totalPrice,
			};

			res.status(200).json(card);
		} catch (error) {
			console.log(error);
		}
	}
);

export { cardRoutes };
