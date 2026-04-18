import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div style={styles.container}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        style={styles.card}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 0 40px rgba(74,222,128,0.25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "none")
        }
      >
        <h2>👤 Your Profile</h2>
        <p style={styles.text}>Manage your preferences and goals</p>

        <button style={styles.button}>Edit Profile</button>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 20px",
    textAlign: "center" as const,
  },

  card: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.12)",
    transition: "0.3s",
  },

  text: {
    color: "#9ca3af",
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "10px",
    background: "linear-gradient(to right,#4ade80,#10b981)",
    border: "none",
    cursor: "pointer",
  },
};