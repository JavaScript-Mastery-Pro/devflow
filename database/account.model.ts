import { Schema, model, models, Document, Types } from "mongoose";

export interface IAccount extends Document {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string; // e.g., 'github', 'google', 'credentials'
  providerAccountId: string;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
