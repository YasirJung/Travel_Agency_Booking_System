const express = require('express');
const { getAllBookings, createBooking } = require('../controllers/bookingController');
const router = express.Router();

// Route to get all bookings
router.get('/', getAllBookings);

// Route to create a new booking
router.post('/', createBooking);

module.exports = router;
