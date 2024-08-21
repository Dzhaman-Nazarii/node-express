import express, { Request, Response } from "express";
import dotenv from "dotenv";
import expressHandlebars from "express-handlebars";

const app = express();

const handlebars = expressHandlebars.create({
	defaultLayout: "main",
	extname: "handlebars",
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.get("/", (req: Request, res: Response): void => {
	res.render("index");
});

app.get("/about", (req: Request, res: Response): void => {
	res.render("about");
});

dotenv.config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
