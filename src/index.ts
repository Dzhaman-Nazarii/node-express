import express from "express";
import dotenv from "dotenv";
import flash from 'connect-flash';
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import session from "express-session";
import connectMongoDBSession from 'connect-mongodb-session';
import variablesMiddleware from './middleware/variables.js';
import userMiddleware from './middleware/user.js';
import errorMiddleware from './middleware/error.js';
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { homeRoutes } from "./routes/home.js";
import { coursesRoutes } from "./routes/courses.js";
import { addRoutes } from "./routes/add.js";
import { cardRoutes } from "./routes/card.js";
import { ordersRoutes } from "./routes/orders.js";
import { authRoutes } from "./routes/auth.js";
import keys from './keys/index.js';

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
	uri: keys.MONGODB_URI,
	collection: 'sessions',
  });

app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./dist/public"));
app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: keys.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store
	})
);
app.use(flash());
app.use(variablesMiddleware);
app.use(userMiddleware);
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);
app.use(errorMiddleware)

async function start() {
	try {
		await mongoose.connect(keys.MONGODB_URI);
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
