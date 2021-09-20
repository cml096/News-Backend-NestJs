import { Document } from 'mongoose';

export interface News extends Document {
  name: string;
  desc: string;
  date: Date;
  category_id: string;
}
