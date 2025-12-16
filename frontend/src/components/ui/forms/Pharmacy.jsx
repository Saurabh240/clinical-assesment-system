import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Briefcase } from 'lucide-react'; // Example icons
import Button from './components/Button'; 
import Card from './components/Card';
import Input from './components/Input';

// NOTE: You must define BASE_URL (e.g., const BASE_URL = "http://localhost:8080";)
// and ensure your components (Button, Card, Input) are correctly imported.

// --- Helper Component for Dropdown/Select (since 'Input' is text-only) ---
// This simulates a Select component using standard HTML elements and your styling context.
const SelectInput = ({ label, name, required, options, helperText, ...props }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      id={name}
      name={name}
      required={required}
      className="block w-full px-4 py-3 text-base rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-200"
      {...props}
    >
      <option value="" disabled>Select an option</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {helperText && (
      <p className="mt-2 text-sm text-gray-500">{helperText}</p>
    )}
  </div>
);
// --------------------------------------------------------------------------

export default function PharmacySignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pharmacyId: '',
    firstName: '',
    lastName: '',
    preferredLanguage: '',
    registrationNumber: '',
    provinceOfRegistration: '',
    startDate: '',
  });

  const [showNewPharmacyForm, setShowNewPharmacyForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle the "Add New Pharmacy" option click within the dropdown
    if (name === 'pharmacyId' && value === 'add_new') {
        setShowNewPharmacyForm(true);
        setFormData(prev => ({ ...prev, pharmacyId: '' })); // Clear the dropdown value
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNewPharmacySubmit = (e) => {
    // In a real application, you would make an API call here to register the new pharmacy.
    // If successful, the API would return a new pharmacy ID.
    console.log("New Pharmacy Submitted (Placeholder)");
    
    // For demonstration: Assume a new ID is created, and we select it.
    const newId = 'PH-XYZ'; 
    setFormData(prev => ({ ...prev, pharmacyId: newId }));
    setShowNewPharmacyForm(false);
    alert('New Pharmacy added and selected!');
  }
  
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basic validation check
      const requiredFields = ['pharmacyId', 'firstName', 'lastName', 'registrationNumber', 'provinceOfRegistration', 'startDate'];
      const missingField = requiredFields.find(field => !formData[field]);

      if (missingField) {
        throw new Error(`Missing required field: ${missingField.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
      }

      // API call to update the user's profile with professional details
      // NOTE: You would typically pass an existing user ID or use a token here.
      // const api = axios.create({ baseURL: BASE_URL }); 
      // const response = await api.post('/api/user/complete-profile', formData);

      // On successful submission
      alert("Professional profile completed successfully! Redirecting to Dashboard.");
      navigate("/dashboard"); 

    } catch (err) {
      console.error("Profile completion failed:", err);
      const errorMessage = err.message || 'Failed to complete profile. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Dummy data for dropdown options
  const PHARMACY_OPTIONS = [
    { value: '1', label: 'City Central Pharmacy' },
    { value: '2', label: 'West End Drugs' },
    { value: 'add_new', label: '--- + Add New Pharmacy ---' },
  ];
  const PROVINCE_OPTIONS = [
    { value: 'ON', label: 'Ontario' },
    { value: 'QC', label: 'Quebec' },
    { value: 'AB', label: 'Alberta' },
    { value: 'BC', label: 'British Columbia' },
  ];
  const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-3xl">
        <Card.Header className="text-center">
          <Card.Title>Complete Your Professional Profile</Card.Title>
          <Card.Description>
            Please provide your associated pharmacy and professional registration details.
          </Card.Description>
        </Card.Header>
        
        {error && (
          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleFinalSubmit}>
          <Card.Content className="space-y-6">
            
            {/* 1. Pharmacy Selection (Dropdown with Nested Form) */}
            <div>
              <SelectInput
                label="Associated Pharmacy"
                name="pharmacyId"
                required
                value={formData.pharmacyId}
                onChange={handleChange}
                options={PHARMACY_OPTIONS}
                helperText={formData.pharmacyId && formData.pharmacyId !== 'add_new' ? `Currently selected ID: ${formData.pharmacyId}` : null}
              />

              {showNewPharmacyForm && (
                <Card variant="filled" padding="sm" className="mt-4 border-dashed border-2 border-teal-300">
                  <Card.Title className="text-lg">Add New Pharmacy</Card.Title>
                  <Input 
                    label="Pharmacy Name" 
                    placeholder="Enter full legal name" 
                    fullWidth 
                    name="newPharmacyName" 
                    required 
                  />
                  <Input 
                    label="Address" 
                    placeholder="Street Address, City, Postal Code" 
                    fullWidth 
                    name="newPharmacyAddress" 
                  />
                  <div className="flex justify-end mt-4">
                    <Button 
                        variant="secondary" 
                        type="button" 
                        onClick={handleNewPharmacySubmit}
                        size="sm"
                    >
                      Save & Use This Pharmacy
                    </Button>
                  </div>
                </Card>
              )}
            </div>
            
            <h4 className="text-xl font-semibold border-b pb-2 pt-4">Personal & Contact Details</h4>

            {/* 2. First Name, Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="First Name" 
                name="firstName" 
                required 
                placeholder="Jane"
                value={formData.firstName}
                onChange={handleChange}
                leftIcon={<User className="w-5 h-5" />}
              />
              <Input 
                label="Last Name" 
                name="lastName" 
                required 
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                leftIcon={<User className="w-5 h-5" />}
              />
            </div>
            
            {/* 3. Preferred Language */}
            <SelectInput
              label="Preferred Language"
              name="preferredLanguage"
              required
              value={formData.preferredLanguage}
              onChange={handleChange}
              options={LANGUAGE_OPTIONS}
            />

            <h4 className="text-xl font-semibold border-b pb-2 pt-4">Registration Details</h4>

            {/* 4. Registration Number & Province */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Registration Number" 
                name="registrationNumber" 
                required 
                placeholder="PROV-12345"
                value={formData.registrationNumber}
                onChange={handleChange}
                leftIcon={<Briefcase className="w-5 h-5" />}
              />
              <SelectInput
                label="Province of Registration"
                name="provinceOfRegistration"
                required
                value={formData.provinceOfRegistration}
                onChange={handleChange}
                options={PROVINCE_OPTIONS}
              />
            </div>
            
            {/* 5. Start Date */}
            <Input 
              label="Start Date" 
              name="startDate" 
              type="date"
              required 
              value={formData.startDate}
              onChange={handleChange}
              leftIcon={<Calendar className="w-5 h-5" />}
              helperText="The date you started practicing in this province."
            />

          </Card.Content>
          
          <Card.Footer>
            {/* 6. Submission Button */}
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth
              loading={loading}
            >
              {loading ? 'Submitting Profile...' : 'Complete Registration'}
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}