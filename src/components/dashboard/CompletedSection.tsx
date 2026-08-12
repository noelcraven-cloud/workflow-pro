import Section from "../common/Section";

import type { Task } from "../../types/task";

type CompletedSectionProps = {
  completedTasks: Task[];
  restoreTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};

function CompletedSection({
  completedTasks,
  restoreTask,
  deleteTask,
}: CompletedSectionProps) {
  return (
    <>
      <Section
        title="✅ Completed"
        count={completedTasks.length}
      />

      {completedTasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "10px 12px",
            marginBottom: "8px",
            border: "1px solid lightgrey",
            borderRadius: "8px",
            background: "white",
          }}
        >
          <span
            style={{
              flex: 1,
              textDecoration: "line-through",
              color: "#666",
            }}
          >
            {task.title}
          </span>

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              onClick={() => restoreTask(task.id)}
            >
              Restore
            </button>

            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Delete "${task.title}" permanently?`
                  )
                ) {
                  deleteTask(task.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CompletedSection;