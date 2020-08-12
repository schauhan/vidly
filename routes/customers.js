const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer, validateCustomer } = require('../models/customersModel');


router.get('/', async (req, res) => {
    const customersList = await Customer.find().select('name').sort('name');
    res.send(customersList);
});


router.get('/:id', async (req, res) => {
    try{
        const getCustomer = await Customer.findById(req.params.id);
        res.send(getCustomer);
    }
    catch(ex){
        res.status(404).send('Could not find a customer with that id: ' + ex.message);
    }
});

  

router.post('/', async (req, res) => {
    const validationResult = validateCustomer(req.body);
    if (validationResult.error) res.status(400).send(validationResult.error);
    
    const newCustomer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await newCustomer.save();
    res.send(newCustomer);
});


router.put('/:id', async (req, res) => {
    // validate new customer
    const validationResult = validateCustomer(req.body);
    if (validationResult.error) res.status(400).send(validationResult.error);

    try{
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, 
            { 
                name: req.body.name,
                phone: req.body.phone,
                isGold: req.body.isGold 
            }, { new: true });
        res.send(updatedCustomer);
    }
    catch(ex){
        res.status(404).send('Could not find a customer with that id: ' + ex.message);
    }
});


router.delete('/:id', async (req, res) => {
    try{
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        res.send(deletedCustomer);
    }
    catch(ex){
        res.status(404).send('Could not find a customer with that id: ' + ex.message);
    }    
});


module.exports = router;