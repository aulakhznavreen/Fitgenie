import { NavLink } from "react-router-dom";

export default function Navbar() {
  const link = ({ isActive }: any) => ({
    color: isActive ? "#4ade80" : "#ccc",
    textDecoration: "none",
  });

  return (
    <nav style={styles.nav}>
      <h2 style={{ color: "white" }}>FitGenie</h2>

      <div style={styles.links}>
        <NavLink to="/" style={link}>Home</NavLink>
        <NavLink to="/onboarding" style={link}>Onboarding</NavLink>
        <NavLink to="/workouts" style={link}>Workouts</NavLink>
        <NavLink to="/about" style={link}>About</NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#020617",
  },

  links: {
    display: "flex",
    gap: "20px",
  },
};