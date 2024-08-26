import { Document } from 'mongoose';

interface ICardItem {
  count: number;
  courseId: string;
}

export interface IUser extends Document {
  email: string;
  name: string;
  card?: {
    items: ICardItem[];
  };
}