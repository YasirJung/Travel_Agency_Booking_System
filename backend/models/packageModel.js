const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    availableDates: [String],
    images: [String], // Array of image URLs
    itinerary: [String], // Array of itinerary details
    highlights: [String] // Array of highlights
});

module.exports = mongoose.model('Package', packageSchema);
