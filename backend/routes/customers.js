var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//defined models 
const customerModel = require('../models/customers.model')

/* GET all customers listing. */
router.get('/', async (req, res) => {
  try {
    // Query the database to fetch all customers
    const customers = await customerModel.find();
    
    // Send the list of customers as a JSON response
    res.status(200).json(customers);
  } catch (err) {
    // Handle errors
    console.error('Error fetching customers:', err);
    res.status(500).json({ status: 500, message: 'Unable to fetch customers', error: err.message });
  }
});


//adding customers
router.post('/add', async (req, res) => {
  try {
    // Extract data from request body
    const { name, lastName, phNo, dob, email } = req.body;

    // Instantiate a new customer object
    const customerObj = new customerModel({
      name: "Mrittika",   
      lastName: "Roy",
      phNo: 123456,
      dob: new Date("1990-10-13"), // Correct format for date
      email: "mrittik@gmail.com"
    });

    // Save the customer object
    const savedCustomer = await customerObj.save();

    // Send success response with the added customer details
    res.status(201).json({ status: 201, message: 'User added successfully', customerdetails: savedCustomer });
  } catch (err) {
    // Handle errors
    console.error('Error adding customer:', err);
    res.status(500).json({ status: 500, message: 'Unable to add customer', error: err.message });
  }
});




/* update customer listing. */
router.put('/update', async (req, res) => {
  try {
    // Capture customerId from the query parameters
    const id = req.query.id;

    // Extract updated data from the request body
    const customerData = {
      name: "rupt",
      lastName: "rai",
      phNo: 78678687,
      dob: new Date("3000-09-09"), // Convert dob to Date object
      email: "tsnika@gmail.com"
    };

    // Find the customer by ID and update it
    const updatedCustomer = await customerModel.findByIdAndUpdate(id, customerData, { new: true });

    // Check if the customer with the given ID exists
    if (!updatedCustomer) {
      return res.status(404).json({ status: 404, message: 'Customer not found' });
    }

    // Send the updated customer as a JSON response
    res.status(200).json(updatedCustomer);
  } catch (err) {
    // Handle errors
    console.error('Error updating customer:', err);
    res.status(500).json({ status: 500, message: 'Unable to update customer', error: err.message });
  }
});






/* delete customer listing. */
router.delete('/delete', async (req, res) => {
  try {
    // Capture customerId from the route parameters
    const deleteid = req.query.deleteid;

    // Find the customer by ID and delete it
    const deletedCustomer = await customerModel.findByIdAndDelete(deleteid);

    // Check if the customer with the given ID exists
    if (!deletedCustomer) {
      return res.status(404).json({ status: 404, message: 'Customer not found' });
    }

    // Send a success response
    res.status(200).json({ status: 200, message: 'Customer deleted successfully' });
  } catch (err) {
    // Handle errors
    console.error('Error deleting customer:', err);
    res.status(500).json({ status: 500, message: 'Unable to delete customer', error: err.message });
  }
});



module.exports = router;
