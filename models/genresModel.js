const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const GenreModel = mongoose.model('Genre', genreSchema);


function validateGenre(genre) {
    const genreSchema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(genre, genreSchema);
};

module.exports.genreSchema = genreSchema;
module.exports.Genre = GenreModel;
module.exports.validateGenre = validateGenre;