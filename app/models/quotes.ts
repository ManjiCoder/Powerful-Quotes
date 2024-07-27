import mongoose from "mongoose";

const Schema = mongoose.Schema;
const quotesSchema = new Schema(
  {
    quote: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isEnabled: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const QuotesModel =
  mongoose.models.quotes || mongoose.model("quotes", quotesSchema);
export default QuotesModel;
