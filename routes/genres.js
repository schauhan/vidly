// const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Genre, validateGenre } = require('../models/genresModel');


router.get('/', async (req, res) => {
    const genresList = await Genre.find().select('name').sort('name');
    res.send(genresList);    
});


router.get('/:id', async (req, res) => {
    const requestedGenre = await Genre.findById(req.params.id);
    if (!requestedGenre) 
        return res.status(404).send('Could not find a genre with that id!');
    res.send(requestedGenre);
});


router.post('/', auth, async (req, res) => {
    const validationResult = validateGenre(req.body);
    if (validationResult.error) return res.status(400).send(validationResult.error);
    
    const newGenre = new Genre({ name: req.body.name });
    await newGenre.save();
    res.send(newGenre);
});


router.put('/:id', auth, async (req, res) => {
    // validate new genre
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error);

    const updatedGenre = await Genre.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name }, 
        { new: true });
    if (!updatedGenre) return res.status(404).send('Could not find a genre with that id!');

    res.send(updatedGenre);
});


// Added a middleware function to make sure that only admin could delete genres
router.delete('/:id', [auth, admin], async (req, res) => {    
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if(!deletedGenre) res.status(404).send('Could not find a genre with that id!');

    res.send(deletedGenre);
});


module.exports = router;