const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// File paths
const patientDirPath = path.join(__dirname, '../data/patients');

// Helper to ensure patient directory exists
const ensurePatientDir = () => {
  if (!fs.existsSync(patientDirPath)) {
    fs.mkdirSync(patientDirPath, { recursive: true });
  }
};

// Get patient file path
const getPatientFilePath = (patientId) => {
  return path.join(patientDirPath, `${patientId}.json`);
};

// Helper to read patient data
const getPatientData = (patientId) => {
  try {
    const filePath = getPatientFilePath(patientId);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading patient file for ${patientId}:`, error);
    return null;
  }
};

// Helper to write patient data
const writePatientData = (patientId, data) => {
  try {
    ensurePatientDir();
    const filePath = getPatientFilePath(patientId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing patient file for ${patientId}:`, error);
    return false;
  }
};

// Create patient profile
exports.createPatientProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    // Check if patient profile already exists
    const existingProfile = getPatientData(id);
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Patient profile already exists'
      });
    }

    // Create patient profile data
    const patientData = {
      id,
      name: req.user.name,
      email: req.user.email,
      personalInfo: req.body.personalInfo || {},
      medicalHistory: req.body.medicalHistory || [],
      appointments: [],
      prescriptions: [],
      lastUpdated: new Date().toISOString()
    };

    // Save patient data
    if (!writePatientData(id, patientData)) {
      return res.status(500).json({
        success: false,
        message: 'Error saving patient data'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Patient profile created successfully',
      data: patientData
    });
  } catch (error) {
    next(error);
  }
};

// Get patient profile
exports.getPatientProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    // Get patient data
    const patientData = getPatientData(id);
    
    if (!patientData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: patientData
    });
  } catch (error) {
    next(error);
  }
};

// Update patient profile
exports.updatePatientProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    // Get existing patient data
    let patientData = getPatientData(id);
    
    if (!patientData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    // Update fields
    if (req.body.personalInfo) {
      patientData.personalInfo = {
        ...patientData.personalInfo,
        ...req.body.personalInfo
      };
    }

    if (req.body.medicalHistory) {
      patientData.medicalHistory = req.body.medicalHistory;
    }

    patientData.lastUpdated = new Date().toISOString();

    // Save updated data
    if (!writePatientData(id, patientData)) {
      return res.status(500).json({
        success: false,
        message: 'Error updating patient data'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Patient profile updated successfully',
      data: patientData
    });
  } catch (error) {
    next(error);
  }
};

// Add medical record
exports.addMedicalRecord = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    // Get existing patient data
    let patientData = getPatientData(id);
    
    if (!patientData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    // Create new medical record
    const newRecord = {
      id: uuidv4(),
      type: req.body.type,
      date: req.body.date || new Date().toISOString(),
      doctor: req.body.doctor,
      diagnosis: req.body.diagnosis,
      treatment: req.body.treatment,
      notes: req.body.notes,
      createdAt: new Date().toISOString()
    };

    // Add to medical history
    if (!patientData.medicalHistory) {
      patientData.medicalHistory = [];
    }
    
    patientData.medicalHistory.push(newRecord);
    patientData.lastUpdated = new Date().toISOString();

    // Save updated data
    if (!writePatientData(id, patientData)) {
      return res.status(500).json({
        success: false,
        message: 'Error adding medical record'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Medical record added successfully',
      data: newRecord
    });
  } catch (error) {
    next(error);
  }
};

// Add prescription
exports.addPrescription = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    // Get existing patient data
    let patientData = getPatientData(id);
    
    if (!patientData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    // Create new prescription
    const newPrescription = {
      id: uuidv4(),
      doctor: req.body.doctor,
      date: req.body.date || new Date().toISOString(),
      medications: req.body.medications || [],
      instructions: req.body.instructions,
      refills: req.body.refills || 0,
      createdAt: new Date().toISOString()
    };

    // Add to prescriptions
    if (!patientData.prescriptions) {
      patientData.prescriptions = [];
    }
    
    patientData.prescriptions.push(newPrescription);
    patientData.lastUpdated = new Date().toISOString();

    // Save updated data
    if (!writePatientData(id, patientData)) {
      return res.status(500).json({
        success: false,
        message: 'Error adding prescription'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Prescription added successfully',
      data: newPrescription
    });
  } catch (error) {
    next(error);
  }
};

// Get all patient IDs (admin only)
exports.getAllPatients = async (req, res, next) => {
  try {
    ensurePatientDir();
    
    // Read all files in the patients directory
    const files = fs.readdirSync(patientDirPath);
    
    // Extract patient IDs from filenames
    const patientIds = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    res.status(200).json({
      success: true,
      count: patientIds.length,
      data: patientIds
    });
  } catch (error) {
    next(error);
  }
}; 