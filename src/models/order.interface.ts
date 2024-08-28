import { Document, Types } from "mongoose";
import { ICourse } from "./course.interface";

interface IOrderCourse {
  course: Types.ObjectId | ICourse;
  count: number;
}

interface IUser {
  name: string;
  userId: Types.ObjectId;
}

interface IOrder extends Document {
  courses: IOrderCourse[];
  user: IUser;
  date: Date;
}

export { IOrder, IOrderCourse, IUser };