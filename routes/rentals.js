const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Customer } = require('../models/customersModel');
const { Movie } = require('../models/moviesModel');
const { Rental, validateRental } = require('../models/rentalsModel');

// Get the list of rentals
router.get('/', async (req, res) => {
    const rentalsList = await Rental.find().select().sort('-dateOut');
    res.send(rentalsList);
});


// Create a new rental
router.post('/', async (req, res) => {
    const {error} = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) res.status(400).send('Invalid movie id: '+ req.body.movieId);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) res.status(400).send('Invalid customer id: '+ req.body.customerId);

    let newRental = new Rental({
        movie: {
            _id: movie._id,
            name: movie.name,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
    });
    await newRental.save();
    
    movie.numberInStock--;
    movie.save();
    
    res.send(newRental);
});


router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
});


module.exports = router;