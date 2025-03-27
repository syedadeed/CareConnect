# CareConnect Backend

This is the backend server for the CareConnect healthcare application. It provides API endpoints for user authentication and patient data management.

## Features

- User authentication (register, login, logout)
- Patient profile management
- Medical records storage
- Per-patient data storage in separate files

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - The default configuration is in `.env` file
   - You can modify these values as needed

3. Run the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout current user
- `GET /api/auth/profile` - Get current user profile (requires authentication)

### Patient Data

- `POST /api/patients/profile` - Create patient profile
- `GET /api/patients/profile` - Get patient profile
- `PUT /api/patients/profile` - Update patient profile
- `POST /api/patients/medical-record` - Add a medical record
- `POST /api/patients/prescription` - Add a prescription
- `GET /api/patients/all` - Get all patients (admin/doctor only)

## Data Storage

- User data is stored in `data/users.json`
- Each patient's data is stored in a separate JSON file in `data/patients/{patient-id}.json`