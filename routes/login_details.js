import express from 'express';
import User from './../models/user_info.js';


const userRouts = express.Router();

//  create a user table into the database
userRouts.post('/', async (req, res) => {
    try {
        console.log(req.body); //  debug

        // Use create (not insertMany): insertMany skips `pre('save')`, so passwords stay plain text.
        const docs = Array.isArray(req.body) ? req.body : [req.body];
        const response = await User.create(docs);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: 'Failed to create user'
        });
    }
});

// Login / profile: username + password in query or body. Wrong password → 401 (never list all users).
userRouts.get('/', async (req, res) => {
    try {
        const username = req.query.username ?? req.body?.username;
        const password = req.query.password ?? req.body?.password;

        if (!username || !password) {
            return res.status(400).json({
                message: 'username and password are required (query or body)'
            });
        }

        const doc = await User.findOne({ username });
        if (!doc) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await doc.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const out = doc.toObject();
        delete out.password; // It removes the sensitive password hash from the object before sending it back to the client.
        res.status(200).json(out);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'Internal server error' });
    }
});

//  get a user by worktype by id
// userRouts.get('/work/:work', async (req, res) => {
//     try {
//         const response = await user.find({work: req.params.work});
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: error.message, message: 'Internal server error'});
//     }
// });

//  PUT is used to update a user by id
userRouts.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id; //finding id (in db by comparing with passed id )
        const updateData = req.body;  //take input data which was passed in the body
        const updateduser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,  //return the updated data
            runValidators: true  //validate the data automatically
         });  

         
         if (!updateduser) {
             return res.status(404).json({message: 'user not found'});
            }
            
            console.log("data updated successfully");
            res.status(200).json(updateduser);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message, message: 'Internal server error'});
    }
});

//  delete a user by id
userRouts.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id; //finding id (in db by comparing with passed id )
        const deleteduser = await User.findByIdAndDelete(userId); //delete the data from the database
        if (!deleteduser) {
            return res.status(404).json({message: 'user not found'});
        }
        console.log("data deleted successfully");
        res.status(200).json("data deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message, message: 'Internal server error'});
    }
});

export default userRouts;