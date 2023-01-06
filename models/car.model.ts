import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    contact: { type: String, required: true },
    carNumber: { type: String, required: true, unique: true },
    dateOfEntry: { type: Date, required: true, default: new Date() },
    lastEntry: { type: Date},
    lastOut: { type: Date},
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);