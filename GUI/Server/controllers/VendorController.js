const Vendor = require("../models/VendorModel");

// Method to create th vendor
const createVendor = async (req, res) => {
  try {
    const { name, email } = req.body;
    const vendor = await Vendor.create({ name, email });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Methoid to get all vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createVendor, getVendors };
