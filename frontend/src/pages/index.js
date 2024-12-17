import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import ImageCarousel from '../components/ImageCarousel';
import { useRouter } from 'next/router';

export default function Home() {
  const [packages, setPackages] = useState([]); // Original fetched packages
  const [filteredPackages, setFilteredPackages] = useState([]); // Filtered packages for display
  const [selectedPackage, setSelectedPackage] = useState(null); // Selected package for booking
  const [showModal, setShowModal] = useState(false); // Toggle booking modal
  const [destination, setDestination] = useState(''); // Search input for destination
  const [maxPrice, setMaxPrice] = useState(''); // Search input for price

  const router = useRouter();

  // Fetch packages from the backend
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const query = [];
      if (destination) query.push(`destination=${destination}`);
      if (maxPrice) query.push(`price=${maxPrice}`);

      const queryString = query.length > 0 ? `?${query.join('&')}` : '';
      const response = await axios.get(`http://localhost:5000/packages${queryString}`);

      setPackages(response.data);
      setFilteredPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  // Handle "Book Now" button click
  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  // Navigate to the package detail page
  const handleTitleClick = (id) => {
    router.push(`/package/${id}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-200 min-h-screen">
      <div className="p-6">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800 drop-shadow-lg">
          Explore Our Tour Packages
        </h1>

        {/* Search and Filter Section */}
        <div className="flex justify-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border px-4 py-2 rounded w-1/3"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border px-4 py-2 rounded w-1/3"
          />
          <button
            onClick={fetchPackages}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Filter
          </button>
        </div>

        {/* Package Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Image Carousel */}
                <div className="h-64 overflow-hidden rounded-t-2xl">
                  <ImageCarousel images={pkg.images} />
                </div>

                {/* Package Details */}
                <div className="p-6 flex flex-col justify-between">
                  <h2
                    className="text-2xl font-bold cursor-pointer hover:text-blue-600 transition"
                    onClick={() => handleTitleClick(pkg._id)}
                  >
                    {pkg.title}
                  </h2>
                  <p className="text-gray-600 mt-2 text-lg">7 Days & 6 Nights</p>
                  <p className="font-bold text-green-600 mt-2 text-xl">
                    INR {pkg.price}
                  </p>
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => handleBookNow(pkg)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">
              No packages available. Try adjusting the filters.
            </p>
          )}
        </div>

        {/* Booking Form Modal */}
        {showModal && (
          <BookingForm pkg={selectedPackage} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}
