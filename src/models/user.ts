import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	card: {
		items: [
			{
				count: {
					type: Number,
					required: true,
					default: 1,
				},
				courseId: {
					type: Schema.Types.ObjectId,
					ref: "Course",
					required: true,
				},
			},
		],
	},
});

userSchema.methods.addToCard = async function (course: ICourse): Promise<void> {
	const clonedItems = [...this.card.items];
	const idx = clonedItems.findIndex((c) => c.courseId.toString() === course._id.toString());

	if (idx >= 0) {
		clonedItems[idx].count++;
	} else {
		clonedItems.push({
			courseId: course._id,
			count: 1,
		});
	}

	this.card.items = clonedItems;
	await this.save();
};

userSchema.methods.removeFromCard = async function (id: string): Promise<void> {
	let clonedItems = [...this.card.items];
	const idx = clonedItems.findIndex((c) => c.courseId.toString() === id.toString());

	if (idx >= 0) {
		if (clonedItems[idx].count > 1) {
			clonedItems[idx].count--;
		} else {
			clonedItems = clonedItems.filter((c) => c.courseId.toString() !== id.toString());
		}

		this.card.items = clonedItems;
		await this.save();
	}
};

userSchema.methods.clearCard = async function (): Promise<void> {
	this.card.items = [];
	await this.save();
};

const User = model("User", userSchema);

export { User };