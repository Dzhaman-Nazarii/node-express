import { v7 as uuid } from "uuid";
import fs from "fs/promises";
import { ICourse } from "./course.interface";

class Course implements ICourse {
	title: string;
	price: number;
	img: string;
	id: string;

	constructor(title: string, price: number, img: string) {
		this.title = title;
		this.price = price;
		this.img = img;
		this.id = uuid();
	}

    async save(): Promise<void> {
        try {
            const courses = await Course.getAll();
            const newCourse = { title: this.title, price: this.price, img: this.img, id: this.id };
            courses.push(newCourse);
            await fs.writeFile("src/data/courses.json", JSON.stringify(courses, null, 2));
        } catch (error) {
            console.error("Error saving courses:", error);
        }
    }

	static async getAll(): Promise<ICourse[]> {
		try {
			const content = await fs.readFile("src/data/courses.json", "utf-8");
			return JSON.parse(content);
		} catch (error) {
			console.error("Error reading or parsing the file:", error);
			throw error;
		}
	}
}

export { Course };
