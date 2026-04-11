import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    work: { type: String,
         required: true,
         enum: ['developer', 'designer', 'manager'] },
    password: { type: String, required: true },
    username: { type: String, required: true }   
});

//  bcrypt password
personSchema.pre('save', async function(next) {
    const person = this;
    // hash the password only if it is modified 
    if (!person.isModified('password')) { return next(); }
    try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
        // hash the password
       
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

personSchema.methods.comparePassword = async function(enteredPassword) {
    try {
        //bcrypt compare the candidate password with the password in the database in hash format
        //work add the salt to the entered password and generate hash, and compare it with the stored hash
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

//  Correct model name (NO dots)
const person = mongoose.model('person', personSchema);

export default person;