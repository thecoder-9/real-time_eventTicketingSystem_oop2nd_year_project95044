const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/CustomerModel');

// Signup: Create a new customer
const createCustomer = async (req, res) => {
  const { firstName, lastName, nic, contact, email, password, confirmPassword } = req.body;

  try {
    // Check if customer already exists by NIC or email
    const existingCustomer = await Customer.findOne({ $or: [{ nic }, { email }] });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer with this NIC or email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const newCustomer = new Customer({
      firstName,
      lastName,
      nic,
      contact,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, 
    });

    await newCustomer.save();
    console.log('Customer details saved inside the database.');
    res.status(201).json({ message: 'Customer created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login: Authenticate a customer
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ error: 'Customer not found' });
    }

    // Compare password with hashed password
    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send back the user ID along with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: customer._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCustomer, loginCustomer };
