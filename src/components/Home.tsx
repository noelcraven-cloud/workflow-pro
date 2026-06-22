type HomeProps = {
  triageCount: number;
};

function Home({ triageCount }: HomeProps) {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>Workflow Pro</h1>

        <button
  onClick={() => alert("Quick Add coming soon")}
  style={{
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    fontSize: "28px",
    border: "1px solid lightgrey",
    cursor: "pointer",
    background: "white",
  }}
>
  +
</button>
      </div>

      <Section title="📥 Triage" count={triageCount} />

      <Section title="👤 Me" count={0} />

      <Section title="👥 Team" count={0} />

      <Section title="🔄 BAU" count={0} />

      <Section title="👤 By Person" count={0} />

      <Section title="🏷️ By Project" count={0} />

      <Section title="✅ Completed" count={0} />
    </div>
  );
}

type SectionProps = {
  title: string;
  count: number;
};

function Section({ title, count }: SectionProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid lightgrey",
        padding: "16px 0",
      }}
    >
      <h2>
        {title} ({count})
      </h2>
    </div>
  );
}

export default Home;