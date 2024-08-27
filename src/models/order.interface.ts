import { Document, Types } from "mongoose";

interface IOrderCourse {
  course: Record<string, unknown>;
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