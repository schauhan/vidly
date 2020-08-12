const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { User, validateUser } = require('../models/usersModel');


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // check if the user is already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered!');

    let newUser = new User({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    // Salting and hashing the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Adding an auth token to the the response
    const token = newUser.generateAuthToken();
    res.header('x-auth-token', token).send(newUser);
});


module.exports = router;