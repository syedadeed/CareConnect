// API client for CareConnect backend
let API_URL = 'http://127.0.0.1:3000/api'; // Default server URL using IP address instead of localhost

// Check for URL parameter to override the API URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('api')) {
  const apiParam = urlParams.get('api');
  if (apiParam) {
    API_URL = apiParam.endsWith('/api') ? apiParam : `${apiParam}/api`;
    console.log('Using API URL from parameter:', API_URL);
  }
}

// API request helper
async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_URL}${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // To include cookies in the request
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    
    // For non-JSON responses
    if (!response.headers.get('content-type')?.includes('application/json')) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { success: true };
    }
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }
    
    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Authentication APIs
const authAPI = {
  // Register a new user
  register: async (userData) => {
    return apiRequest('/auth/register', 'POST', userData);
  },
  
  // Login a user
  login: async (credentials) => {
    return apiRequest('/auth/login', 'POST', credentials);
  },
  
  // Logout current user
  logout: async () => {
    return apiRequest('/auth/logout');
  },
  
  // Get current user profile
  getProfile: async () => {
    return apiRequest('/auth/profile');
  }
};

// Patient APIs
const patientAPI = {
  // Create patient profile
  createProfile: async (profileData) => {
    return apiRequest('/patients/profile', 'POST', profileData);
  },
  
  // Get patient profile
  getProfile: async () => {
    return apiRequest('/patients/profile');
  },
  
  // Update patient profile
  updateProfile: async (profileData) => {
    return apiRequest('/patients/profile', 'PUT', profileData);
  },
  
  // Add medical record
  addMedicalRecord: async (recordData) => {
    return apiRequest('/patients/medical-record', 'POST', recordData);
  },
  
  // Add prescription
  addPrescription: async (prescriptionData) => {
    return apiRequest('/patients/prescription', 'POST', prescriptionData);
  }
};

// Doctor/Admin APIs
const adminAPI = {
  // Get all patients (requires doctor/admin role)
  getAllPatients: async () => {
    return apiRequest('/patients/all');
  }
};

// Export the API modules
window.careConnectAPI = {
  auth: authAPI,
  patient: patientAPI,
  admin: adminAPI
}; 