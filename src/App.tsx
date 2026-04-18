import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Workouts from './pages/Workouts'; // This now points to the correct React component
import Nutrition from './pages/Nutrition'; // Assuming these exist
import Progress from './pages/Progress';   // Assuming these exist
import Profile from './pages/Profile';    // Assuming these exist
import About from './pages/About';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Wrap Workouts route with ErrorBoundary */}
        <Route
          path="/workouts"
          element={
            <ErrorBoundary>
              <Workouts />
            </ErrorBoundary>
          }
        />

        {/* Add routes for other pages if they exist */}
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;