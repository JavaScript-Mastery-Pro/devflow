import { Schema, models, model, Document } from "mongoose";

export interface IVote extends Document {
  author: Schema.Types.ObjectId;
  id: Schema.Types.ObjectId;
  type: string;
  voteType: string;
  createdAt: Date;
}

const VoteSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  id: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ["question", "answer"], required: true },
  voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Vote = models.Vote || model("Vote", VoteSchema);

export default Vote;
