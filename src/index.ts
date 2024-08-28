import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import session from "express-session";
import connectMongoDBSession from 'connect-mongodb-session';
import variablesMiddleware from './middleware/variables.js';
import userMiddleware from './middleware/user.js';
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { homeRoutes } from "./routes/home.js";
import { coursesRoutes } from "./routes/courses.js";
import { addRoutes } from "./routes/add.js";
import { cardRoutes } from "./routes/card.js";
import { ordersRoutes } from "./routes/orders.js";
import { authRoutes } from "./routes/auth.js";

const MONGODB_URI = "mongodb+srv://Nazarii:DkYgW.dCdt2AyH3@cluster0.nxh4bxc.mongodb.net/Shop";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.engine(
	"handlebars",
	engine({
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions',
  });

app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./dist/public"));
app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "some secret value",
		resave: false,
		saveUninitialized: false,
		store
	})
);
app.use(variablesMiddleware);
app.use(userMiddleware);
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

async function start() {
	try {
		await mongoose.connect(MONGODB_URI);
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
