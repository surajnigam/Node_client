import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    work: { type: String,
         required: true,
         enum: ['developer', 'designer', 'manager'] }
});

//  Correct model name (NO dots)
const person = mongoose.model('person', personSchema);

export default person;