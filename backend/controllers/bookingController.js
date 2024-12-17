const Booking = require('../models/bookingModel');

// Fetch all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body); // Create new booking
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

module.exports = { getAllBookings, createBooking };
