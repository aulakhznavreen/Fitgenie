import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <h1 style={styles.title}>404 😵</h1>
      <p style={styles.text}>Page not found</p>
      <a href="/" style={styles.button}>Go Home</a>
    </motion.div>
  );
}

const styles = {
  container: { padding: "80px 20px", textAlign: "center" as const },
  title: { fontSize: "60px" },
  text: { color: "#9ca3af" },
  button: {
    marginTop: "20px",
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "10px",
    background: "linear-gradient(to right, #4ade80, #10b981)",
    color: "black",
    textDecoration: "none",
  },
};