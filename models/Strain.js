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
});

const Strain = mongoose.models.Strain || mongoose.model('Strain', strainSchema);
export default Strain;