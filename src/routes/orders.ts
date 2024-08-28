import { Request, Response, Router } from "express";
import { Order } from "../models/order.js";
import { IOrderCourse, IUser } from "../models/order.interface";
import { ICourse } from "../models/course.interface.js";
import auth from "../middleware/auth.js";

const ordersRoutes = Router();

ordersRoutes.get("/", auth, async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user) {
			res.status(401).send("User not authenticated");
			return;
		}

		const orders = await Order.find({
			"user.userId": req.user._id,
		})
			.populate("user.userId")
			.populate("courses.course")
			.lean();

		res.render("orders", {
			title: "Orders",
			isOrders: true,
			orders: orders.map((order) => {
				return {
					...order,
					price: order.courses.reduce((total, c) => {
						const course = c.course as unknown as ICourse;
						return total + c.count * course.price;
					}, 0),
				};
			}),
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

ordersRoutes.post("/", auth, async (req: Request, res: Response): Promise<void> => {
	try {
		const user = (await req.user?.populate("card.items.courseId")) as {
			card: { items: { courseId: any; count: number }[] } | undefined;
		};

		if (!user || !user.card) {
			res.status(404).send("User or card not found");
			return;
		}

		const courses: IOrderCourse[] = user.card.items.map((item) => ({
			count: item.count,
			course: item.courseId,
		}));

		const order = new Order({
			user: {
				name: req.user?.name,
				userId: req.user?._id,
			} as IUser,
			courses,
		});

		await order.save();
		await req.user?.clearCard();

		res.redirect("/orders");
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

export { ordersRoutes };
