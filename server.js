import app from './app.js';
import './db.js';
import personRouts from './routes/person_routes.js';
import clientRouts from './routes/client_routes.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
//  Middleware
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/person', personRouts);
app.use('/client', clientRouts);


app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
});

// comment here for testing git