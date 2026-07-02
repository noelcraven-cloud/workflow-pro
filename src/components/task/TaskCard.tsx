import type { Task } from "../../types/task";

type TaskCardProps = {
  task: Task;
  onAssignPeople: (task: Task) => void;
};

function TaskCard({
  task,
  onAssignPeople,
}: TaskCardProps) {
  return (
    <div
      style={{
        padding: "12px",
        marginBottom: "12px",
        border: "1px solid lightgrey",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <input
          type="checkbox"
          disabled
          style={{
            marginRight: "12px",
          }}
        />

        <strong>{task.title}</strong>
      </div>

      <div
        style={{
          marginBottom: "12px",
        }}
      >
        People:{" "}
        {task.people.length > 0
          ? task.people.join(" & ")
          : "Unassigned"}
      </div>

      {task.people.length === 0 ? (
  <button
    onClick={() => onAssignPeople(task)}
  >
    Assign People
  </button>
) : (
  <button disabled>
    Assign Workflow
  </button>
)}
    </div>
  );
}

export default TaskCard;