const express = require("express");
const { createVendor, getVendors } = require("../controllers/VendorController");
const router = express.Router();

// Route to add vendor
router.post("/", createVendor);

// Route to get vendors
router.get("/", getVendors);

module.exports = router;
