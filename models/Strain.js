import mongoose from 'mongoose';

const strainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  effects: {
    type: Number,
    required: true,
  },
  comments: String,
  date: {
    type: Date,
    default: Date.now,
  },
  ratings: {
    taste: { type: Number, min: 1, max: 5, default: 3 },
    potency: { type: Number, min: 1, max: 5, default: 3 },
    duration: { type: Number, min: 1, max: 5, default: 3 },
    overall: { type: Number, min: 1, max: 5, default: 3 }
  }
});

const Strain = mongoose.models.Strain || mongoose.model('Strain', strainSchema);
export default Strain;