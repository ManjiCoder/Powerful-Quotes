import mongoose from "mongoose";

const Schema = mongoose.Schema;
const quotesSchema = new Schema(
  {
    quote: String,
    authur: String,
    isEnable: Boolean,
  },
  { timestamps: true }
);

const QuotesModel =
  mongoose.models.quotes || mongoose.model("quotes", quotesSchema);
export default QuotesModel;
