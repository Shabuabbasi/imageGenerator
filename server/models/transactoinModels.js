import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: true, default: true },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Number },
});

const transactionModel =
  mongoose.model.transaction ||
  mongoose.model("transaction", transactionSchema);
export default transactionModel;
