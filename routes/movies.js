const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Movie, validateMovie } = require('../models/moviesModel');
const {Genre} = require('../models/genresModel');


router.get('/', async (req, res) => {
    const moviesList = await Movie.find().select('name genre').sort('name');
    res.send(moviesList);
});


router.get('/:id', async (req, res) => {
    try{
        const getMovie = await Movie.findById(req.params.id);
        res.send(getMovie);
    }
    catch(ex){
        res.status(404).send('Could not find a movie with that id: ' + ex.message);
    }
});

  

router.post('/', auth, async (req, res) => {
    const validationResult = validateMovie(req.body);
    if (validationResult.error) res.status(400).send(validationResult.error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre id: '+ req.body.genreId);

    const newMovie = new Movie({ 
        name: req.body.name,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await newMovie.save();
    res.send(newMovie);
});


router.put('/:id', auth, async (req, res) => {
    // validate new customer
    const validationResult = validateMovie(req.body);
    if (validationResult.error) res.status(400).send(validationResult.error);

    const genre = await Genre.findById(_id);
    if(!genre) return res.status(400).send('Invalid genre id: '+ _id);

    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
            { 
              title: req.body.title,
              genre: {
                _id: genre._id,
                name: genre.name
              },
              numberInStock: req.body.numberInStock,
              dailyRentalRate: req.body.dailyRentalRate
            }, { new: true });
        res.send(updatedMovie);
    }
    catch(ex){
        res.status(404).send('Could not find a movie with that id: ' + ex.message);
    }
});


router.delete('/:id', auth, async (req, res) => {
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        res.send(deletedMovie);
    }
    catch(ex){
        res.status(404).send('Could not find a movie with that id: ' + ex.message);
    }    
});


module.exports = router;