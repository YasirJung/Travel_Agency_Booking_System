const Package = require('../models/packageModel');

// Fetch all packages with optional filters
const getPackages = async (req, res) => {
  const { price, destination } = req.query; // Query parameters from URL

  const filters = {};
  if (price) filters.price = { $lte: Number(price) }; // Filter by maximum price
  if (destination) filters.title = { $regex: destination, $options: 'i' }; // Filter by destination (case-insensitive search)

  try {
    const packages = await Package.find(filters);
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error });
  }
};

// Fetch a single package by ID
const getPackageById = async (req, res) => {
  const { id } = req.params;
  try {
    const pkg = await Package.findById(id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package', error });
  }
};

// Add a new package
const addPackage = async (req, res) => {
  try {
    const { title, description, price, availableDates, images } = req.body;

    const newPackage = new Package({
      title,
      description,
      price,
      availableDates: Array.isArray(availableDates)
        ? availableDates
        : availableDates.split(',').map((date) => date.trim()),
      images: Array.isArray(images)
        ? images
        : images.split(',').map((img) => img.trim()),
    });

    await newPackage.save();
    res.json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error adding package', error });
  }
};

// Update an existing package
const updatePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description, price, availableDates, images } = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        availableDates: Array.isArray(availableDates)
          ? availableDates
          : availableDates.split(',').map((date) => date.trim()),
        images: Array.isArray(images)
          ? images
          : images.split(',').map((img) => img.trim()),
      },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating package', error });
  }
};

// Delete a package
const deletePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error });
  }
};

// Export all controller functions
module.exports = { getPackages, getPackageById, addPackage, updatePackage, deletePackage };
