import { Schema, model } from "mongoose";

const courseSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	img: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

const Course = model("Course", courseSchema);

export { Course };