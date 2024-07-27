import mongoose from "mongoose";

const Schema = mongoose.Schema;
const quotesSchema = new Schema(
  {
    quote: { type: String, required: true, trim: true },
    authur: { type: String, required: true, trim: true },
    isEnabled: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const QuotesModel =
  mongoose.models.quotes || mongoose.model("quotes", quotesSchema);
export default QuotesModel;
