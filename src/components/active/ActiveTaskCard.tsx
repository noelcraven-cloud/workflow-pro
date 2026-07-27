import type { Task } from "../../types/task";

type ActiveTaskCardProps = {
  task: Task;
  rank?: number;
  onComplete: (taskId: string) => void;
};

function ActiveTaskCard({
  task,
  rank,
  onComplete,
}: ActiveTaskCardProps) {
  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: "10px",
        padding: "14px",
        marginBottom: "10px",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <input
          type="checkbox"
          aria-label={`Complete ${task.title}`}
          onChange={() => onComplete(task.id)}
        />

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            {rank ? `P${rank} ` : ""}
            {task.title}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <div>
              📁 <strong>Project:</strong>{" "}
              {task.project ?? "None"}
            </div>

            <div>
              👥 <strong>People:</strong>{" "}
              {task.people.join(" & ")}
            </div>

            <div>
              🗂 <strong>Workflow:</strong> Ranked
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveTaskCard;