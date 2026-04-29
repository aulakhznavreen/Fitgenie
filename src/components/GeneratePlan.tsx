import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generatePlan } from '../api/api';

const GeneratePlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state;

  useEffect(() => {
    if (
      !formData ||
      !formData.goal ||
      !formData.frequency ||
      !formData.diet ||
      !formData.equipment ||
      !formData.targetAreas?.length
    ) {
      navigate('/onboarding');
      return;
    }

    const fetchPlan = async () => {
      try {
        setLoading(true);
        const plan = await generatePlan(formData);
        setWorkoutPlan(plan);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [formData, navigate]);

  return (
    <div className="container">
      <section className="card">
        <h2>Your Fitness Plan</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {workoutPlan && !loading && !error && <pre>{workoutPlan}</pre>}
      </section>
    </div>
  );
};

export default GeneratePlan;
