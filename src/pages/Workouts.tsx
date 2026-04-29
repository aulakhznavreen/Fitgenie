// src/pages/Workouts.tsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePlan } from '../api/api'; // Correctly import generatePlan from the api file
// You might want to install and use react-markdown for safer and better markdown rendering:
// npm install react-markdown
// import ReactMarkdown from 'react-markdown';

// Define the interface for formData for type safety (must match Workouts and Onboarding)
interface FormData {
  goal: string;
  frequency: string;
  diet: string;
  equipment: string;
  targetAreas: string[];
}

const Workouts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure formData is correctly typed when accessed from location.state
  const formData: FormData | undefined = location.state as FormData | undefined;

  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Basic validation for formData, redirect if incomplete
    if (
      !formData ||
      !formData.goal ||
      !formData.frequency ||
      !formData.diet ||
      !formData.equipment ||
      !formData.targetAreas || formData.targetAreas.length === 0
    ) {
      console.warn('Missing or incomplete form data. Redirecting to onboarding.');
      navigate('/onboarding');
      return;
    }

    const fetchPlan = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const planText = await generatePlan(formData); // Call the generatePlan function from api.ts
        setPlan(planText);
      } catch (err: any) {
        // Enhanced Error Logging for Workouts component
        console.error('Error fetching plan in Workouts component:', err);
        if (err instanceof Error) {
          console.error('Error message:', err.message);
          console.error('Error name:', err.name);
          // If you were using Axios for a backend proxy, you'd check err.response here:
          // if ((err as any).response) { console.error('Axios response data:', (err as any).response.data); }
        } else {
          console.error('Non-Error object caught:', JSON.stringify(err, null, 2));
        }
        setError(err.message || 'An unexpected error occurred while generating your plan. Please check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [formData, navigate]);


  return (
    <div className="container">
      <section className="card">
        <h2>Your Personalized Fitness Plan</h2>

        {loading && <p>Loading your plan... This might take a moment.</p>}

        {error && (
          <div style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
            <h3>Error generating plan:</h3>
            <p>{error}</p>
            <p>Please go back to the onboarding page and try again, or check your API key setup.</p>
            <button
              onClick={() => navigate('/onboarding')}
              style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Go to Onboarding
            </button>
          </div>
        )}

        {plan && !loading && !error && (
          <div className="workout-plan-container">
            {/* Using dangerouslySetInnerHTML is simple but can be a security risk with untrusted content.
                For production, consider a markdown rendering library like 'react-markdown'.
            */}
            <div
              className="workout-plan-content"
              style={{ whiteSpace: 'pre-wrap', fontSize: '1rem', lineHeight: '1.5' }}
              dangerouslySetInnerHTML={{ __html: plan.replace(/\n/g, '<br>') }}
            />
            {/* Example with react-markdown (if installed):
            <ReactMarkdown className="workout-plan-content">
              {plan}
            </ReactMarkdown>
            */}
          </div>
        )}

        {!loading && !error && !plan && (
          <p>No plan generated yet. Please complete the onboarding form to get started.</p>
        )}
      </section>
    </div>
  );
};

export default Workouts;