import express from 'express';
import client from './../models/client.js';
// import { jwtAuthmiddleware, generateToken } from './../jwt.js';
const clientRouts = express.Router();

clientRouts.post('/',  async (req, res) => {
    try {
        console.log(req.body); //  debug
 
        //  FIXED HERE
        const response = await client.insertMany(req.body);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: 'Failed to create person'
        });
    }
});

clientRouts.get('/', async (req, res) => {
    try {
        const response = await client.find();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message, message: 'Internal server error'});
    }
});

export default clientRouts;