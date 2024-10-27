import { Schema, models, model, Document } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  actionId: Schema.Types.ObjectId;
  actionType: string;
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true }, // 'upvote', 'downvote', 'view', 'ask_question',
  actionId: { type: Schema.Types.ObjectId, required: true }, // 'questionId', 'answerId',
  actionType: { type: String, enum: ["question", "answer"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
