import { Schema, models, model, Document } from "mongoose";

export interface ITagQuestion extends Document {
  tag: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  createdAt: Date;
}

const TagQuestionSchema = new Schema({
  tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  createdAt: { type: Date, default: Date.now },
});

const TagQuestion =
  models.TagQuestion || model("TagQuestion", TagQuestionSchema);

export default TagQuestion;
