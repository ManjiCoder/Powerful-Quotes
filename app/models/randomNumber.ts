import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const randomSchema = new Schema(
  {
    date: { type: String, required: true },
    quoteId: { type: Schema.Types.ObjectId, required: true },
    number: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const RandomModel =
  mongoose.models.random || mongoose.model('random', randomSchema);
export default RandomModel;
