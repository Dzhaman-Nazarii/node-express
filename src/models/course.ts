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
    ref: "User",
  },
});

courseSchema.method("toClient", function () {
  const course = this.toObject() as { id: string; _id: any };
  course.id = course._id.toString();
  delete course._id;
  return course;
});

const Course = model("Course", courseSchema);

export { Course };