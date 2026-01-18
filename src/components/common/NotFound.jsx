import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Floating shapes */}
      <div style={{ ...styles.shape, ...styles.shape1 }} />
      <div style={{ ...styles.shape, ...styles.shape2 }} />
      <div style={{ ...styles.shape, ...styles.shape3 }} />

      <div style={styles.content}>
        <h1 style={styles.code}>404</h1>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.text}>
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <button style={styles.button} onClick={() => navigate("/")}>
          Go to Dashboard
        </button>
      </div>

      {/* Inline animations */}
      <style>{keyframes}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#fff",
  },
  content: {
    textAlign: "center",
    zIndex: 2,
    animation: "fadeUp 1s ease",
  },
  code: {
    fontSize: "140px",
    fontWeight: 800,
    background: "linear-gradient(90deg, #6366f1, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "float 3s ease-in-out infinite",
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  text: {
    opacity: 0.8,
    marginBottom: "30px",
    maxWidth: "400px",
  },
  button: {
    padding: "12px 28px",
    background: "#6366f1",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  shape: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(40px)",
    opacity: 0.4,
    animation: "drift 10s infinite alternate",
  },
  shape1: {
    width: 300,
    height: 300,
    background: "#6366f1",
    top: -100,
    left: -100,
  },
  shape2: {
    width: 250,
    height: 250,
    background: "#22c55e",
    bottom: -100,
    right: -100,
    animationDuration: "12s",
  },
  shape3: {
    width: 180,
    height: 180,
    background: "#f97316",
    bottom: "40%",
    left: "60%",
    animationDuration: "14s",
  },
};

const keyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes drift {
  from { transform: translate(0, 0); }
  to { transform: translate(40px, -30px); }
}
`;

export default NotFound;
