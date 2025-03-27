const express = require('express');
const { 
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
  addMedicalRecord,
  addPrescription,
  getAllPatients
} = require('../controllers/patientController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// All patient routes require authentication
router.use(isAuthenticatedUser);

// Patient profile routes
router.post('/profile', createPatientProfile);
router.get('/profile', getPatientProfile);
router.put('/profile', updatePatientProfile);

// Medical records routes
router.post('/medical-record', addMedicalRecord);

// Prescription routes
router.post('/prescription', addPrescription);

// Admin routes
router.get('/all', authorizeRoles('admin', 'doctor'), getAllPatients);

module.exports = router; 