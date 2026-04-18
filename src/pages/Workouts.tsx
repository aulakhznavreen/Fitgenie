import { useState } from "react";

export default function Workouts() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const generatePlan = async () => {
    setLoading(true);
    setPlan("");

    try {
      const res = await fetch("http://localhost:5000/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: "Build muscle",
          frequency: "4",
          diet: "High protein",
          equipment: "Gym",
          targetAreas: ["Chest", "Arms"],
        }),
      });

      const data = await res.json();
      setPlan(data.plan);
    } catch {
      setPlan("❌ Failed to generate plan");
    }

    setLoading(false);
  };

  // 🔥 split markdown into sections
  const sections = plan.split("##").filter((s) => s.trim() !== "");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Workout Planner 💪</h1>

      <button onClick={generatePlan} style={styles.button}>
        {loading ? "Generating..." : "Generate Plan ⚡"}
      </button>

      {loading && <p style={styles.loading}>AI is crafting your plan...</p>}

      {/* 💎 DASHBOARD OUTPUT */}
      <div style={styles.grid}>
        {sections.map((section, i) => {
          const [title, ...content] = section.split("\n");

          return (
            <div key={i} style={styles.card}>
              <h3 style={styles.cardTitle}>
                {getIcon(title)} {title}
              </h3>

              <p style={styles.cardContent}>
                {content.join("\n")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 🎯 add icons based on section
function getIcon(title: string) {
  if (title.toLowerCase().includes("overview")) return "📌";
  if (title.toLowerCase().includes("weekly")) return "📅";
  if (title.toLowerCase().includes("diet")) return "🍽️";
  if (title.toLowerCase().includes("daily")) return "🏋️";
  return "✨";
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

  button: {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(to right,#4ade80,#10b981)",
    cursor: "pointer",
  },

  loading: {
    marginTop: "10px",
    color: "#9ca3af",
  },

  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    maxWidth: "1000px",
    marginInline: "auto",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "left" as const,
  },

  cardTitle: {
    marginBottom: "10px",
    fontWeight: "bold",
  },

  cardContent: {
    whiteSpace: "pre-wrap" as const,
    color: "#d1d5db",
    fontSize: "14px",
  },
};