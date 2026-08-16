import { useState } from "react";

type QuickAddProps = {
  addTask: (title: string) => void;
};

function QuickAdd({ addTask }: QuickAddProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  function createTask() {
    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    addTask(trimmedTitle);
    setTaskTitle("");
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                createTask();
              }
            }}
            placeholder="Task title"
            autoFocus
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <button onClick={createTask}>
              Create
            </button>

            <button
              onClick={() => {
                setTaskTitle("");
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-label="Quick Add"
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
    </>
  );
}

export default QuickAdd;