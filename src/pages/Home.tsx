import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* 🔥 HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.hero}
      >
        <h1 style={styles.title}>FitGenie 🧞‍♂️</h1>
        <p style={styles.subtitle}>
          Your AI fitness & nutrition dashboard
        </p>
      </motion.div>

      {/* 💎 DASHBOARD CARDS */}
      <div style={styles.grid}>

        <Card title="Workouts 💪" onClick={() => navigate("/workouts")} />
        <Card title="Nutrition 🍽️" onClick={() => navigate("/nutrition")} />
        <Card title="Progress 📊" onClick={() => navigate("/progress")} />
        <Card title="Profile 👤" onClick={() => navigate("/profile")} />

      </div>

      {/* 🎬 HOW IT WORKS */}
      <div style={styles.tutorial}>
        <h2 style={styles.sectionTitle}>How it works ⚡</h2>

        <div style={styles.steps}>
          <Step text="1. Enter your fitness goal" />
          <Step text="2. AI generates your plan" />
          <Step text="3. Track & improve daily" />
        </div>
      </div>

    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Card({ title, onClick }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={styles.card}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 0 25px rgba(74,222,128,0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "none")
      }
    >
      {title}
    </motion.div>
  );
}

function Step({ text }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.step}
    >
      {text}
    </motion.div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: "60px 20px",
    textAlign: "center" as const,
  },

  hero: {
    marginBottom: "40px",
  },

  title: {
    fontSize: "44px",
    fontWeight: "bold",
    background: "linear-gradient(to right,#4ade80,#10b981)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },

  subtitle: {
    color: "#9ca3af",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },

  card: {
    padding: "25px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "0.3s",
  },

  tutorial: {
    marginTop: "60px",
  },

  sectionTitle: {
    marginBottom: "20px",
  },

  steps: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    maxWidth: "400px",
    margin: "0 auto",
  },

  step: {
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
  },
};