import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [goal, setGoal] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [diet, setDiet] = useState<string>('');
  const [equipment, setEquipment] = useState<string>(''); // Single string for equipment
  const [targetAreas, setTargetAreas] = useState<string[]>([]); // Array for target areas
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps = 5;
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!goal) newErrors.goal = 'Please select a fitness goal.';
    if (!frequency) newErrors.frequency = 'Please select your workout frequency.';
    if (!diet) newErrors.diet = 'Please select your dietary preference.';
    if (!equipment) newErrors.equipment = 'Please select the equipment you have.';
    if (targetAreas.length === 0) newErrors.targetAreas = 'Please select at least one target area.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({}); // Clear errors on successful validation
      navigate('/workouts', {
        state: {
          goal,
          frequency,
          diet,
          equipment,
          targetAreas,
        },
      });
    }
  };

  const handleNextStep = () => {
    const newErrors: { [key: string]: string } = {};
    let hasError = false;

    if (currentStep === 1 && !goal) { newErrors.goal = 'Please select a fitness goal.'; hasError = true; }
    if (currentStep === 2 && !frequency) { newErrors.frequency = 'Please select your workout frequency.'; hasError = true; }
    if (currentStep === 3 && !diet) { newErrors.diet = 'Please select your dietary preference.'; hasError = true; }
    if (currentStep === 4 && !equipment) { newErrors.equipment = 'Please select the equipment you have.'; hasError = true; }
    if (currentStep === 5 && targetAreas.length === 0) { newErrors.targetAreas = 'Please select at least one target area.'; hasError = true; }

    setErrors(newErrors); // Set errors for the current step

    if (!hasError && currentStep < steps) {
      setCurrentStep(currentStep + 1);
    } else if (!hasError && currentStep === steps) {
        // If it's the last step and no errors, it means they are ready to submit
        // The submit button will handle the navigation in handleSubmit
    }
  };

  const handlePreviousStep = () => {
    setErrors({}); // Clear errors when going back
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setTargetAreas((prev) => (checked ? [...prev, value] : prev.filter((area) => area !== value)));
  };

  return (
    <div className="container">
      <section className="card">
        <h2>FitGenie Onboarding</h2>
        <p>Please fill out the form to personalize your fitness plan.</p>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(currentStep / steps) * 100}%` }}></div>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          {currentStep === 1 && (
            <div className="form-group">
              <label htmlFor="goal-select">What’s your fitness goal?</label>
              <select id="goal-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="">Select your goal</option>
                <option value="loseWeight">Lose Weight</option>
                <option value="buildMuscle">Build Muscle</option>
                <option value="boostEndurance">Boost Endurance</option>
                <option value="overallFitness">Overall Fitness</option>
              </select>
              {errors.goal && <span className="error">{errors.goal}</span>}
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-group">
              <label htmlFor="frequency-select">How often do you want to work out per week?</label>
              <select id="frequency-select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="">Select frequency</option>
                <option value="1-2">1–2 times</option>
                <option value="3-4">3–4 times</option>
                <option value="5+">5 or more times</option>
              </select>
              {errors.frequency && <span className="error">{errors.frequency}</span>}
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-group">
              <label htmlFor="diet-select">What is your dietary preference?</label>
              <select id="diet-select" value={diet} onChange={(e) => setDiet(e.target.value)}>
                <option value="">Select dietary preference</option>
                <option value="omnivore">Omnivore</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="ketogenic">Ketogenic</option>
              </select>
              {errors.diet && <span className="error">{errors.diet}</span>}
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-group">
              <label htmlFor="equipment-select">What equipment do you have access to?</label>
              <select id="equipment-select" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
                <option value="">Select equipment</option>
                <option value="gym">Full Gym Access</option>
                <option value="home">Basic Home Equipment (Dumbbells, Bands)</option>
                <option value="none">No Equipment (Bodyweight Only)</option>
              </select>
              {errors.equipment && <span className="error">{errors.equipment}</span>}
            </div>
          )}

          {currentStep === 5 && (
            <div className="form-group">
              <label>Which areas would you like to target?</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    value="core"
                    onChange={handleCheckboxChange}
                    checked={targetAreas.includes('core')}
                  />
                  Core
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="legs"
                    onChange={handleCheckboxChange}
                    checked={targetAreas.includes('legs')}
                  />
                  Legs
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="chest"
                    onChange={handleCheckboxChange}
                    checked={targetAreas.includes('chest')}
                  />
                  Chest
                </label>
                 <label>
                  <input
                    type="checkbox"
                    value="back"
                    onChange={handleCheckboxChange}
                    checked={targetAreas.includes('back')}
                  />
                  Back
                </label>
                 <label>
                  <input
                    type="checkbox"
                    value="arms"
                    onChange={handleCheckboxChange}
                    checked={targetAreas.includes('arms')}
                  />
                  Arms
                </label>
                 <label>
                  <input
                    type="checkbox"
                    value="shoulders"
                    onChange={handleCheckboxChange}
                    checked={targetAreas.includes('shoulders')}
                  />
                  Shoulders
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="fullBody"
                    onChange={handleCheckboxChange}
                    checked={targetAreas.includes('fullBody')}
                  />
                  Full Body
                </label>
              </div>
              {errors.targetAreas && <span className="error">{errors.targetAreas}</span>}
            </div>
          )}

          <div className="form-buttons">
            {currentStep > 1 && (
              <button type="button" onClick={handlePreviousStep}>
                Back
              </button>
            )}
            {currentStep < steps ? (
              <button type="button" onClick={handleNextStep}>
                Next
              </button>
            ) : (
              <button type="submit">Generate Plan</button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default Onboarding;