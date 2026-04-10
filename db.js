import mongoose from 'mongoose';

const mongoUrl = 'mongodb://localhost:27017/dummy_database';

mongoose.connect(mongoUrl); // ✅ no options

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('connected', () => {
    console.log('✅ Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('❌ Disconnected from MongoDB');
});

db.on('reconnected', () => {
    console.log('🔄 Reconnected to MongoDB');
});

export default db;