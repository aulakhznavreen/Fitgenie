// src/api/api.ts

import axios from 'axios'; // Import axios

// Define the interface for the form data (used by generatePlan)
export interface GeneratePlanParams {
  goal: string;
  frequency: string;
  diet: string;
  equipment: string; // e.g., 'gym', 'home', 'none'
  targetAreas: string[];
}

// Define the base URL for your backend server
// IMPORTANT: In a production environment, this should be an actual domain/IP,
// and probably come from an environment variable (e.g., REACT_APP_BACKEND_URL).
// For development, localhost:5000 is fine.
const BACKEND_BASE_URL = 'http://localhost:5000';

/**
 * Calls your backend server to generate a personalized fitness plan using Gemini AI.
 * @param {GeneratePlanParams} formData - The user's input data from the onboarding form.
 * @returns {Promise<string>} A promise that resolves with the generated workout plan as a string.
 */
export const generatePlan = async (formData: GeneratePlanParams): Promise<string> => {
  console.log('Frontend: Calling backend to generate plan...');
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/api/generate-plan`, formData);

    if (response.data && response.data.plan) {
      console.log('Frontend: Plan received from backend.');
      return response.data.plan;
    } else {
      console.error('Frontend: Backend did not return a valid plan in response.data.plan:', response.data);
      throw new Error('Backend responded, but no plan content was found. Please check backend logs.');
    }
  } catch (error: any) {
    console.error('Frontend: Error calling backend /api/generate-plan:', error);
    // Handle Axios errors specifically to get details from the backend's response
    if (axios.isAxiosError(error) && error.response) {
      console.error('Frontend: Backend error data:', error.response.data);
      console.error('Frontend: Backend error status:', error.response.status);
      throw new Error(`Failed to generate plan: ${error.response.data.error || 'Server error'}`);
    } else {
      // Generic error handling
      throw new Error(`Failed to connect to backend or unknown error: ${error.message || 'Please ensure your backend server is running.'}`);
    }
  }
};