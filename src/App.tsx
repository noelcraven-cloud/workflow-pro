import Dashboard from "./components/dashboard/Dashboard";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
  tasks,
  addTask,
  updateTaskTitle,
  updateTaskPeople,
    updateTaskRanks,
    updateTaskProject,
    completeTask,
    deleteTask,
    restoreTask,
  } = useTasks();

  const triageTasks = tasks.filter(
    (task) => task.status === "TRIAGE"
  );

  const activeTasks = tasks.filter(
    (task) => task.status === "ACTIVE"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  return (
    <Dashboard
      triageTasks={triageTasks}
      activeTasks={activeTasks}
      completedTasks={completedTasks}
      addTask={addTask}
      updateTaskTitle={updateTaskTitle}
      updateTaskPeople={updateTaskPeople}
      updateTaskRanks={updateTaskRanks}
      updateTaskProject={updateTaskProject}
      completeTask={completeTask}
      deleteTask={deleteTask}
      restoreTask={restoreTask}
    />
  );
}

export default App;