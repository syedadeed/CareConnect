const fs = require('fs');
const path = require('path');

// Directory paths
const dataDir = path.join(__dirname, '../data');
const patientsDir = path.join(dataDir, 'patients');

// Ensure directories exist
const ensureDirectories = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(patientsDir)) {
    fs.mkdirSync(patientsDir, { recursive: true });
  }
};

// Get all patient records (for admin/doctor use)
const getAllPatientRecords = () => {
  ensureDirectories();
  
  try {
    const files = fs.readdirSync(patientsDir);
    
    const patients = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(patientsDir, file);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      });
    
    return patients;
  } catch (error) {
    console.error('Error reading patient records:', error);
    return [];
  }
};

// Get a summary of all patients
const getPatientsSummary = () => {
  const patients = getAllPatientRecords();
  
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    email: patient.email,
    lastUpdated: patient.lastUpdated
  }));
};

// Get patient's full medical history
const getPatientMedicalHistory = (patientId) => {
  try {
    const filePath = path.join(patientsDir, `${patientId}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data.medicalHistory || [];
  } catch (error) {
    console.error(`Error reading medical history for patient ${patientId}:`, error);
    return null;
  }
};

// Backup all patient data (for admin use)
const backupPatientData = () => {
  ensureDirectories();
  
  try {
    const backupDir = path.join(dataDir, 'backups');
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `patients_backup_${timestamp}.json`);
    
    const patients = getAllPatientRecords();
    fs.writeFileSync(backupPath, JSON.stringify(patients, null, 2), 'utf8');
    
    return {
      success: true,
      message: `Backup created at ${backupPath}`,
      timestamp
    };
  } catch (error) {
    console.error('Error creating backup:', error);
    return {
      success: false,
      message: 'Error creating backup',
      error: error.message
    };
  }
};

module.exports = {
  ensureDirectories,
  getAllPatientRecords,
  getPatientsSummary,
  getPatientMedicalHistory,
  backupPatientData
}; 