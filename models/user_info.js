import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    // Full name of the user
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    // Gmail address, must be unique
    gmail: {
        type: String,
        required: [true, 'Gmail address is required'],
        unique: true, // Ensures no two users can have the same gmail
        lowercase: true, // Converts email to lowercase before saving
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    // Username, must be unique
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, // Ensures no two users can have the same username
        lowercase: true, // Converts username to lowercase
        trim: true // Removes whitespace from both ends
    },
    // Password will be hashed by the pre-save hook
    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, {
    // This option automatically adds `createdAt` and `updatedAt` fields
    timestamps: true
});

// bcrypt password — async hooks must not use `next()` (Mongoose 7+); return / throw instead.
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
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
const user = mongoose.model('user', userSchema);

export default user;