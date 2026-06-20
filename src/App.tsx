function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Workflow Pro</h1>

        <button
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>

      <hr />

      <h2>📥 Triage (0)</h2>

      <hr />

      <h2>👤 Me (0)</h2>

      <hr />

      <h2>👥 Team (0)</h2>

      <hr />

      <h2>🔄 BAU (0)</h2>

      <hr />

      <h2>👤 By Person (0)</h2>

      <hr />

      <h2>🏷️ By Project (0)</h2>

      <hr />

      <h2>✅ Completed (0)</h2>
    </div>
  );
}

export default App;