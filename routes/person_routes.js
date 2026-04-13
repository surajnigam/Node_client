import express from 'express';
import Person from './../models/person.js';
import { jwtAuthmiddleware, generateToken } from './../jwt.js';

const personRouts = express.Router();

export async function handlePersonSignup(req, res) {
    try {
        const data = { ...req.body };
        if (data.gmail && !data.email) data.email = data.gmail;
        delete data.gmail;

        const newUser = new Person(data);
        const response = await newUser.save();
        console.log('user created successfully');

        const payload = {
            id: response.id,
            username: response.username
        };

        const token = generateToken(payload);
        res.status(200).json({ response, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: 'Failed to create person'
        });
    }
}

// personRouts.post('/signup', handlePersonSignup);

export async function handlePersonLogin(req, res) {
    try {
        const username = req.query.username ?? req.body?.username;//username from query(link) or body
        const password = req.query.password ?? req.body?.password;

        if (!username || !password) {
            return res.status(400).json({
                message: 'username and password are required (query or body)'
            });
        }
        const user = await Person.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const payload = {
            id: user.id,
            username: user.username,
        };

        const token = generateToken(payload);
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'Internal server error' });
    }
}

// Login / profile: username + password in query or body. Wrong password → 401 (never list all users).
// personRouts.get('/login', handlePersonLogin);

export async function handlePersonProfile(req, res) {
    try {
        
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'Internal server error' });
    }
}

// personRouts.get('/profile', jwtAuthmiddleware, handlePersonProfile);

export async function handlePerson(req, res) {
    try {
        const response = await Person.find();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'Internal server error' });
    }
}

// personRouts.get('/person', jwtAuthmiddleware, handlePerson);

//  get a person by worktype by id
personRouts.get('/work/:work', async (req, res) => {
    try {
        const response = await Person.find({work: req.params.work});
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message, message: 'Internal server error'});
    }
});

//  PUT is used to update a person by id
personRouts.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //finding id (in db by comparing with passed id )
        const updateData = req.body;  //take input data which was passed in the body
        const updatedPerson = await Person.findByIdAndUpdate(personId, updateData, {
            new: true,  //return the updated data
            runValidators: true  //validate the data automatically
         });  

         
         if (!updatedPerson) {
             return res.status(404).json({message: 'Person not found'});
            }
            
            console.log("data updated successfully");
            res.status(200).json(updatedPerson);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message, message: 'Internal server error'});
    }
});

//  delete a person by id
personRouts.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //finding id (in db by comparing with passed id )
        const deletedPerson = await Person.findByIdAndDelete(personId); //delete the data from the database
        if (!deletedPerson) {
            return res.status(404).json({message: 'Person not found'});
        }
        console.log("data deleted successfully");
        res.status(200).json("data deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message, message: 'Internal server error'});
    }
});

export default personRouts;