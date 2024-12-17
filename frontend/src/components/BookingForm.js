import React, { useState } from 'react';
import Invoice from './Invoice';

export default function BookingForm({ pkg, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    numberOfTravelers: '',
    specialRequests: '',
    totalPrice: 0, // Add totalPrice field to formData
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form submission state

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is "numberOfTravelers", update totalPrice dynamically
    if (name === 'numberOfTravelers') {
      const updatedTotalPrice = pkg.price * value;
      setFormData({
        ...formData,
        [name]: value,
        totalPrice: updatedTotalPrice, // Update totalPrice dynamically
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the booking details to the backend
      await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true); // Mark form submission as successful
      alert('Booking successful!');
    } catch (err) {
      console.error('Error submitting booking:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Book {pkg.title}</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />
            <input
              type="number"
              name="numberOfTravelers"
              placeholder="Number of Travelers"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />
            <textarea
              name="specialRequests"
              placeholder="Special Requests (Optional)"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <p className="font-bold mb-4">
              Total Price: INR {formData.totalPrice || 0}
            </p>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full mt-2 text-red-500"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p className="text-green-600 font-bold mb-4">
              Booking Confirmed! Download your invoice below:
            </p>
            <Invoice booking={formData} pkg={pkg} />
            <button
              onClick={onClose}
              className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
