import mongoose from 'mongoose';

const subClientSchema = new mongoose.Schema({
    subClientId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true
    }
});

const clientSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    subClients: [subClientSchema] // 👈 nested array
}, {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

export default Client;