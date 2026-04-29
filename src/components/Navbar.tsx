import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">FitGenie</div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/onboarding" className="navbar-link">Onboarding</Link>
        <Link to="/workouts" className="navbar-link">Workouts</Link>
        <Link to="/about" className="navbar-link">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
