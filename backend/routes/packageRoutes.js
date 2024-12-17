const express = require('express');
const router = express.Router();
const {
  getPackages,
  getPackageById,
  addPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');

// Define routes
router.get('/', getPackages);           // Fetch all packages
router.get('/:id', getPackageById);     // Fetch a single package by ID
router.post('/', addPackage);           // Add a new package
router.put('/:id', updatePackage);      // Update a package
router.delete('/:id', deletePackage);   // Delete a package

module.exports = router;
