import { useState } from "react";

export default function Nutrition() {
  const [goal, setGoal] = useState("");
  const [diet, setDiet] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!goal || !diet) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setPlan("");

    try {
      const res = await fetch("http://localhost:5000/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          frequency: "3",
          diet,
          equipment: "none",
          targetAreas: [],
        }),
      });

      const data = await res.json();
      setPlan(data.plan);
    } catch {
      setPlan("❌ Failed to generate plan");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nutrition Planner 🍽️</h1>

      {/* INPUT CARD */}
      <div style={styles.card}>
        <input
          placeholder="Your goal (e.g. weight loss)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Diet (veg / keto / high protein)"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          style={styles.input}
        />

        <button onClick={generatePlan} style={styles.button}>
          {loading ? "Generating..." : "Generate Plan ⚡"}
        </button>
      </div>

      {/* OUTPUT */}
      {plan && (
        <div style={styles.result}>
          {plan.split("##").map((section, i) => {
            if (!section.trim()) return null;

            const [title, ...content] = section.split("\n");

            return (
              <div key={i} style={styles.resultCard}>
                <h3 style={styles.resultTitle}>{title}</h3>
                <p style={styles.resultText}>
                  {content.join("\n")}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 20px",
    textAlign: "center" as const,
  },

  title: {
    fontSize: "30px",
    marginBottom: "20px",
  },

  card: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  input: {
    width: "100%",
    margin: "8px 0",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    background: "linear-gradient(to right,#4ade80,#10b981)",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  result: {
    marginTop: "30px",
    maxWidth: "800px",
    marginInline: "auto",
  },

  resultCard: {
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "left" as const,
  },

  resultTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },

  resultText: {
    whiteSpace: "pre-wrap" as const,
    color: "#d1d5db",
    fontSize: "14px",
  },
};