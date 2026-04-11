// import app from './app.js';
import './db.js';
import personRouts from './routes/person_routes.js';
import clientRouts from './routes/client_routes.js';
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
// auth.js file code we can place here also, but for keeping the server.js clean we add separate file for auth.js
import { auth } from './auth.js';

//  Middleware
app.use(express.json());







 
// middleware to log the request, end point of api at what time it is called
const logEndpoit = (req, res, next)=>{
    console.log(`${req.method}  ${req.url}  ${new Date().toISOString()}`);
    next();
}
app.use(logEndpoit);

/*
app.post('/',  passport.authenticate('local', { session: false }),  (req, res) => {
        res.json({
            message: 'Login successful',
            user: req.user
        });
    }
);*/

// app.use('/person', auth,  personRouts);
app.use('/person', auth, personRouts);
// app.use('/person',  personRouts);
app.use('/client',  clientRouts);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
});

// comment here for testing git