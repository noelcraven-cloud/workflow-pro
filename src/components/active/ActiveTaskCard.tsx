import type { Task } from "../../types/task";

type ActiveTaskCardProps = {
  task: Task;
  rank?: number;
};

function ActiveTaskCard({
  task,
  rank,
}: ActiveTaskCardProps) {
  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: "10px",
        padding: "12px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "6px",
        }}
      >
        {rank ? `P${rank} ` : ""}
        {task.title}
      </div>

      {task.project && (
        <div
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          📁 {task.project}
        </div>
      )}
    </div>
  );
}

export default ActiveTaskCard;