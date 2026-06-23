import { useState } from "react";

import Home from "./components/Home";
import type { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Welcome to Workflow Pro",
      status: "TRIAGE",
      people: [],
      taskType: "RANKED",
    },
  ]);

  function addTask(title: string) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmedTitle,
      status: "TRIAGE",
      people: [],
      taskType: "RANKED",
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  const triageCount = tasks.filter(
    (task) => task.status === "TRIAGE"
  ).length;

  return (
    <Home
      triageCount={triageCount}
      addTask={addTask}
    />
  );
}

export default App;