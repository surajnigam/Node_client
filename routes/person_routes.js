import express from 'express';
import Person from './../models/person.js';


const personRouts = express.Router();

//  create a person table into the database
personRouts.post('/', async (req, res) => {
    try {
        console.log(req.body); //  debug

        // Use create (not insertMany): insertMany skips `pre('save')`, so passwords stay plain text.
        const docs = Array.isArray(req.body) ? req.body : [req.body];
        const response = await Person.create(docs);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: 'Failed to create person'
        });
    }
});

//  get all the persons table data  from the database
personRouts.get('/', async (req, res) => {
    try {
        const response = await Person.find();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message, message: 'Internal server error'});
    }
});

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