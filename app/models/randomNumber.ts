import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const randomNumSchema = new Schema(
  {
    quote: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isEnabled: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const RandomNumModal =
  mongoose.models.RandomNum || mongoose.model('RandomNum', randomNumSchema);
export default RandomNumModal;
