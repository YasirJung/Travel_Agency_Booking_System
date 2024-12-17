import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  // Fetch bookings on component load
  useEffect(() => {
    axios
      .get('http://localhost:5000/bookings') // Backend API endpoint
      .then((res) => {
        console.log('Fetched Bookings:', res.data); // Debugging log
        setBookings(res.data); // Set the bookings state
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err); // Debug error
        setError('Unable to fetch bookings. Please try again later.');
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700 drop-shadow-md">
          Customer Bookings
        </h1>

        {error ? (
          <div className="text-center text-red-500 font-semibold">
            {error}
          </div>
        ) : bookings.length > 0 ? (
          <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Travelers</th>
                <th className="px-4 py-3">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-all duration-200 text-gray-700"
                >
                  <td className="border px-4 py-3">{booking.name}</td>
                  <td className="border px-4 py-3">{booking.email}</td>
                  <td className="border px-4 py-3">{booking.phoneNumber}</td>
                  <td className="border px-4 py-3">{booking.numberOfTravelers}</td>
                  <td className="border px-4 py-3 font-bold text-green-600">
                    INR {booking.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 font-semibold mt-6">
            No bookings available.
          </p>
        )}
      </div>
    </div>
  );
}
