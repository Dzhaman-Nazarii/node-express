import { ICourse } from "./course.interface";

export interface ICard {
    courses: Array<{ course: ICourse; count: number }>;
    price: number;
}