import { model, Schema } from "mongoose";

const orderSchema = new Schema({
	courses: [
		{
			course: {
				type: Schema.Types.ObjectId,
				ref: "Course",
				required: true,
			},
			count: {
				type: Number,
				required: true,
			},
		},
	],
	user: {
		name: String,
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Order = model("Order", orderSchema);

export { Order };
