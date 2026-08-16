import { useState } from "react";
import type { Task } from "../../types/task";
import CompletedSection from "./CompletedSection";
import Section from "../common/Section";
import MeSection from "./MeSection";
import TeamSection from "./TeamSection";
import TriageSection from "./TriageSection";

type DashboardProps = {
  triageTasks: Task[];
  activeTasks: Task[];
  completedTasks: Task[];

  addTask: (title: string) => void;

  updateTaskPeople: (
    taskId: string,
    people: string[]
  ) => void;

  updateTaskRanks: (
    taskId: string,
    personRanks: Record<string, number>
  ) => void;

  updateTaskProject: (
    taskId: string,
    project: string
  ) => void;

  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  restoreTask: (taskId: string) => void;
};

function Dashboard({
  triageTasks,
  activeTasks,
  completedTasks,
  addTask,
  updateTaskPeople,
  updateTaskRanks,
  updateTaskProject,
  completeTask,
deleteTask,
restoreTask,
}: DashboardProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  

  const myActiveTasks = activeTasks
    .filter((task) => task.people.includes("Me"))
    .sort((a, b) => {
      const rankA = a.personRanks?.Me ?? Number.MAX_SAFE_INTEGER;
      const rankB = b.personRanks?.Me ?? Number.MAX_SAFE_INTEGER;
      return rankA - rankB;
    });

  const teamActiveTasks = activeTasks.filter(
  (task) => !task.people.includes("Me")
);

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
      <div style={{ marginBottom: "24px" }}>
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
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="Task title"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />
          <button onClick={createTask}>Create</button>
        </div>
      )}

      <TriageSection
  tasks={triageTasks}
  updateTaskPeople={updateTaskPeople}
  updateTaskRanks={updateTaskRanks}
  updateTaskProject={updateTaskProject}
/>

      <MeSection
  tasks={myActiveTasks}
  completeTask={completeTask}
/>

            <TeamSection
  tasks={teamActiveTasks}
  completeTask={completeTask}
/>

      <Section title="🔄 BAU" count={0} />
      <Section title="👤 By Person" count={0} />
      <Section title="🏷️ By Project" count={0} />
      <CompletedSection
  completedTasks={completedTasks}
  restoreTask={restoreTask}
  deleteTask={deleteTask}
/>

      <button
        onClick={() => setShowQuickAdd(!showQuickAdd)}
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

export default Dashboard;