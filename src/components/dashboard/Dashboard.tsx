import type { Task } from "../../types/task";
import CompletedSection from "./CompletedSection";
import Section from "../common/Section";
import MeSection from "./MeSection";
import TeamSection from "./TeamSection";
import TriageSection from "./TriageSection";
import QuickAdd from "./QuickAdd";

type DashboardProps = {
  triageTasks: Task[];
  activeTasks: Task[];
  completedTasks: Task[];

  addTask: (title: string) => void;
  updateTaskTitle: (
  taskId: string,
  title: string
) => void;

  updateTaskPeople: (
    taskId: string,
    people: string[]
  ) => void;

  updateTaskRanks: (
    taskId: string,
    personRanks: Record<string, number>
  ) => void;

moveTaskRank: (
  taskId: string,
  person: string,
  requestedRank: number
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
updateTaskTitle,
updateTaskPeople,
  updateTaskRanks,
moveTaskRank,
updateTaskProject,
  completeTask,
deleteTask,
restoreTask,
}: DashboardProps) {

  

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

      <QuickAdd addTask={addTask} />

      <TriageSection
  tasks={triageTasks}
  updateTaskPeople={updateTaskPeople}
  updateTaskRanks={updateTaskRanks}
  updateTaskProject={updateTaskProject}
/>

      <MeSection
  tasks={myActiveTasks}
  completeTask={completeTask}
  updateTaskTitle={updateTaskTitle}
  moveTaskRank={moveTaskRank}
  updateTaskProject={updateTaskProject}
/>

            <TeamSection
  tasks={teamActiveTasks}
  completeTask={completeTask}
  updateTaskTitle={updateTaskTitle}
  moveTaskRank={moveTaskRank}
  updateTaskProject={updateTaskProject}
/>

      <Section title="🔄 BAU" count={0} />
      <Section title="👤 By Person" count={0} />
      <Section title="🏷️ By Project" count={0} />
      <CompletedSection
  completedTasks={completedTasks}
  restoreTask={restoreTask}
  deleteTask={deleteTask}
/>

    </div>
  );
}

export default Dashboard;