import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <h1 style={styles.title}>About FitGenie</h1>
      <p style={styles.text}>
        FitGenie is your AI-powered fitness assistant designed to create
        personalized workout and nutrition plans.
      </p>
    </motion.div>
  );
}

const styles = {
  container: { padding: "60px 20px", textAlign: "center" as const },
  title: { fontSize: "32px", marginBottom: "10px" },
  text: { color: "#9ca3af", maxWidth: "600px", margin: "0 auto" },
};