import fs from "fs/promises";
import { ICourse } from "./course.interface";
import { ICard } from "./card.interface";

class Card {
	static async add(course: ICourse): Promise<void> {
		const card: ICard = await Card.fetch();
		const idx = card.courses.findIndex((c) => c.course.id === course.id);
		const candidate = card.courses[idx];

		if (candidate) {
			candidate.count++;
		} else {
			card.courses.push({ course, count: 1 });
		}

		card.price += Number(course.price);

		try {
			await fs.writeFile(
				"src/data/card.json",
				JSON.stringify(card, null, 2)
			);
		} catch (error) {
			console.error("Error adding course to card:", error as Error);
		}
	}

	static async fetch(): Promise<ICard> {
		try {
			const content = await fs.readFile("src/data/card.json", "utf-8");
			const card = JSON.parse(content) as ICard;

			card.price = Number(card.price);

			return card;
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
				return { courses: [], price: 0 };
			}
			console.error("Error reading or parsing the file:", error as Error);
			return { courses: [], price: 0 };
		}
	}

	static async remove(id: string): Promise<ICard> {
		const card = await Card.fetch();
	
		const idx = card.courses.findIndex((c) => c.course.id === id);
		const course = card.courses[idx];
	
		if (course.count === 1) {
			card.courses = card.courses.filter(c => c.course.id !== id);
		} else {
			card.courses[idx].count--;
		}
	
		card.price -= Number(course.course.price);
	
		try {
			await fs.writeFile(
				"src/data/card.json",
				JSON.stringify(card, null, 2),
			);
			return card;
		} catch (error) {
			console.error("Error removing course from card:", error as Error);
			throw error;
		}
	}
}

export { Card };