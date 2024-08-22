import express, { Request, Response } from "express";
import dotenv from "dotenv";
import expressHandlebars from "express-handlebars";
import { homeRoutes } from "./routes/home.js";
import { coursesRoutes } from "./routes/courses.js";
import { addRoutes } from "./routes/add.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

const handlebars = expressHandlebars.create({
	defaultLayout: "main",
	extname: "handlebars",
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
