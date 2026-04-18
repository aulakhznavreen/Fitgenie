import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Progress() {
  const [day, setDay] = useState("");
  const [calories, setCalories] = useState("");
  const [data, setData] = useState<any[]>([]);

  const addData = () => {
    if (!day || !calories) return;

    setData([
      ...data,
      {
        day,
        calories: Number(calories),
      },
    ]);

    setDay("");
    setCalories("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cardio Burn Tracker 🔥</h1>

      {/* INPUT SECTION */}
      <div style={styles.card}>
        <input
          placeholder="Day (e.g Day 1)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Calories burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={styles.input}
        />

        <button onClick={addData} style={styles.button}>
          Add Entry ➕
        </button>
      </div>

      {/* CHART */}
      <div style={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="calories" />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  input: {
    width: "100%",
    margin: "8px 0",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
    background: "linear-gradient(to right,#4ade80,#10b981)",
    border: "none",
    cursor: "pointer",
  },

  chart: {
    maxWidth: "700px",
    margin: "30px auto",
  },
};