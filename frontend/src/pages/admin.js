import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function Admin() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
    images: '',
  });
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/packages');
      setPackages(res.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert images and availableDates to arrays
    const updatedFormData = {
      ...formData,
      images: formData.images.split(',').map((img) => img.trim()), // Convert to array
      availableDates: formData.availableDates.split(',').map((date) => date.trim()), // Convert to array
    };

    try {
      if (editingPackage) {
        // Update existing package
        await axios.put(
          `http://localhost:5000/packages/${editingPackage._id}`,
          updatedFormData
        );
      } else {
        // Add new package
        await axios.post('http://localhost:5000/packages', updatedFormData);
      }

      // Reset form and refresh packages
      setFormData({ title: '', description: '', price: '', availableDates: '', images: '' });
      setEditingPackage(null);
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/packages/${id}`);
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEdit = (pkg) => {
    setFormData({
      ...pkg,
      images: pkg.images.join(', '), // Convert array to comma-separated string
      availableDates: pkg.availableDates.join(', '), // Convert array to comma-separated string
    });
    setEditingPackage(pkg);
  };

  return (
    <div>
      {/* Navbar with only 'Bookings' Option */}
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Admin Panel</h1>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-3xl mx-auto"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 mb-4 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 mb-4 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 mb-4 rounded"
            required
          />
          <input
            type="text"
            name="availableDates"
            placeholder="Available Dates (comma-separated)"
            value={formData.availableDates}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 mb-4 rounded"
            required
          />
          <input
            type="text"
            name="images"
            placeholder="Image URLs (comma-separated)"
            value={formData.images}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingPackage ? 'Update Package' : 'Add Package'}
          </button>
        </form>

        {/* Package List */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Available Packages</h2>
          <ul>
            {packages.map((pkg) => (
              <li
                key={pkg._id}
                className="border-b py-4 flex justify-between items-center text-gray-800"
              >
                <span>
                  <strong>{pkg.title}</strong> - INR {pkg.price}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
