const express = require("express");
const router = express.Router();

// Sample property data
const properties = [
  { id: 1, title: "Luxury Apartment", location: "San Juan", price: 250000 },
  { id: 2, title: "Beach House", location: "Fajardo", price: 500000 },
];

// API route to get properties
router.get("/", (req, res) => {
  res.json(properties);
});

module.exports = router;
