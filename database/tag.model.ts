import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  questions: number;
  createdAt: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  questions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
