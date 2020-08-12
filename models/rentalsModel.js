const Joi = require('joi');
const mongoose = require('mongoose');

// const {customerSchema} = require('./customersModel');
// const {movieSchema} = require('./moviesModel');

// Instead of using customerSchema and movieSchema we made new schemas for them.
// This way we could store only a subset of the customer and movie properties
// in the rentalModel; we don't have to store every property from those schemas.
const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true, 
                minlength: 5,
                maxlength: 255
              },
              dailyRentalRate: { 
                type: Number, 
                required: true,
                min: 0,
                max: 255
              }                    
        }),
        required: true,
    },
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
              },
              isGold: {
                type: Boolean,
                default: false
              },
              phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
              }      
          
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        default: 0
    }
});


const Rental = mongoose.model('Rental', rentalSchema);


function validateRental(rental) {
    const rentalSchema = {
        customerId: Joi.objectId().required(),        
        movieId: Joi.objectId().required()
        // We are not validating other fields because
        // those fields should not be added by the customer.
        // They will be added on the server.
    };

    return Joi.validate(rental, rentalSchema);
};

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
module.exports.rentalSchema = rentalSchema;