import { useState } from "react";

import Dashboard from "./components/Dashboard";
import type { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTask: Task = {
  id: Date.now().toString(),
  title: trimmedTitle,
  status: "TRIAGE",
  people: [],
  personRanks: {},
  taskType: "RANKED",
  createdAt: new Date().toISOString(),
};

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function updateTaskPeople(
    taskId: string,
    people: string[]
  ) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, people }
          : task
      )
    );
  }

  const triageTasks = tasks.filter(
    (task) => task.status === "TRIAGE"
  );

  return (
    <Dashboard
      triageCount={triageTasks.length}
      triageTasks={triageTasks}
      addTask={addTask}
      updateTaskPeople={updateTaskPeople}
    />
  );
}

export default App;