import { useState } from "react";

type HomeProps = {
  triageCount: number;

  triageTasks: string[];

  addTask: (title: string) => void;
};

function Home({
  triageCount,
  triageTasks,
  addTask,
}: HomeProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");

  function createTask() {
    addTask(taskTitle);

    setTaskTitle("");

    setShowQuickAdd(false);
  }

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
          marginBottom: "24px",
        }}
      >
        <h1>Workflow Pro</h1>
      </div>

      {showQuickAdd && (
        <div
          style={{
            border: "1px solid lightgrey",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <h3>Quick Add</h3>

          <input
            value={taskTitle}
            onChange={(event) =>
              setTaskTitle(event.target.value)
            }
            placeholder="Task title"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <button onClick={createTask}>
            Create
          </button>
        </div>
      )}

      <Section
  title="📥 Triage"
  count={triageCount}
/>

{triageTasks.map((task) => (
  <div
    key={task}
    style={{
      display: "flex",
      alignItems: "center",

      padding: "12px",

      marginBottom: "8px",

      border: "1px solid lightgrey",

      borderRadius: "10px",
    }}
  >
    <input
      type="checkbox"

      disabled

      style={{
        marginRight: "12px",
      }}
    />

    {task}
  </div>
))}

      <Section title="👤 Me" count={0} />

      <Section title="👥 Team" count={0} />

      <Section title="🔄 BAU" count={0} />

      <Section title="👤 By Person" count={0} />

      <Section title="🏷️ By Project" count={0} />

      <Section title="✅ Completed" count={0} />

      <button
        onClick={() =>
          setShowQuickAdd(!showQuickAdd)
        }
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",

          width: "60px",
          height: "60px",

          borderRadius: "50%",

          fontSize: "36px",

          border: "none",

          cursor: "pointer",

          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",

          zIndex: 1000,
        }}
      >
        +
      </button>
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