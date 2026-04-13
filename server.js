// import app from './app.js';
import './db.js';
import personRouts, { handlePersonSignup, handlePersonProfile, handlePersonLogin, handlePerson } from './routes/person_routes.js';
import { jwtAuthmiddleware } from './jwt.js';
import clientRouts from './routes/client_routes.js';
import userRouts from './routes/login_details.js';
import express from 'express';
import dotenv from 'dotenv';
import { configurePassport } from './auth.js';

dotenv.config();

const app = express();

app.use(express.json());
configurePassport(app);

// middleware to log the request, end point of api at what time it is called
const logEndpoit = (req, res, next) => {
    console.log(`${req.method}  ${req.url}  ${new Date().toISOString()}`);
    next();
};
app.use(logEndpoit);

// Do not put passport on every `/person` route — POST create would require a prior login.
// Root aliases (mounting the whole router at `/signup` would make signup `POST /signup/signup` instead).
// app.post('/signup', handlePersonSignup);
app.post('/singup', handlePersonSignup);
app.get('/login', handlePersonLogin);
// Root alias (router is mounted at /person, so the same handler lives at GET /person/profile too)
app.get('/profile', jwtAuthmiddleware, handlePersonProfile);
app.use('/person', jwtAuthmiddleware, handlePerson);
app.use('/client', jwtAuthmiddleware, clientRouts);
app.use('/user', userRouts);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
});

// comment here for testing git
