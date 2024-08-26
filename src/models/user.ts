import { model, Schema } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	card: {
		items: [
			{
				count: {
					type: Number,
					required: true,
					default: 1
				},
				courseId: {
					type: Schema.Types.ObjectId,
					ref: "Course",
					required: true,
				}
			}
		]
	}
});

const User = model("User", userSchema);

export { User };
