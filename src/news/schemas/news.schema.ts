import { Schema } from 'mongoose';

export const newsSchema = new Schema({
  name: { type: String, required: true },
  desc: String,
  date: { type: Date, default: Date.now },
  category_id: { type: Schema.Types.ObjectId, ref: 'category' },
});
