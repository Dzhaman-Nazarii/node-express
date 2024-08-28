import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import session from "express-session";
import variablesMiddleware from './middleware/variables.js';
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { homeRoutes } from "./routes/home.js";
import { coursesRoutes } from "./routes/courses.js";
import { addRoutes } from "./routes/add.js";
import { cardRoutes } from "./routes/card.js";
import { ordersRoutes } from "./routes/orders.js";
import { authRoutes } from "./routes/auth.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.engine(
	"handlebars",
	engine({
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);

app.set("view engine", "handlebars");
app.set("views", "./src/views");

// app.use(async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const user = await User.findById("66cca40cbe84546dc77444b4").exec();
// 		req.user = user as IUser | undefined;
// 		next();
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send("Internal Server Error");
// 	}
// });

app.use(express.static("./dist/public"));
app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "some secret value",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(variablesMiddleware);
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

async function start() {
	try {
		const url =
			"mongodb+srv://Nazarii:DkYgW.dCdt2AyH3@cluster0.nxh4bxc.mongodb.net/Shop";
		await mongoose.connect(url);
		// const candidate = await User.findOne();
		// if (!candidate) {
		// 	const user = new User({
		// 		email: "nazar@gmail.com",
		// 		name: "Nazarii",
		// 		card: { items: [] },
		// 	});
		// 	await user.save();
		// }
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
