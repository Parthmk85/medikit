import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a medicine name'] },
  category: { type: String, required: [true, 'Please provide a category'] }, // e.g. Tablet, Syrup
  problemType: { type: String, required: [true, 'Please provide a problem type'] }, // e.g. Fever, Cold
  price: { type: Number, required: [true, 'Please provide a price'] },
  description: { type: String },
  imageUrl: { type: String, default: '' },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);
