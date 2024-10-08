import { Document, Types } from 'mongoose';
import { ICourse } from './course.interface';

export interface ICardItem {
  count: number;
  courseId: Types.ObjectId;
}

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  avatarUrl?: string;
  resetToken?: string,
	resetTokenExp?: Date,
  card?: {
    items: ICardItem[];
  };
  addToCard: (course: ICourse) => Promise<void>;
  removeFromCard: (id: string) => Promise<void>;
  clearCard: () => Promise<void>;
}