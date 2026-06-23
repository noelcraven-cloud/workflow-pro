import { useState } from "react";

import Home from "./components/Home";
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
      taskType: "RANKED",
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  const triageCount = tasks.filter(
  (task) => task.status === "TRIAGE"
).length;

const triageTasks = tasks
  .filter((task) => task.status === "TRIAGE")
  .map((task) => task.title);

return (
  <Home
    triageCount={triageCount}
    triageTasks={triageTasks}
    addTask={addTask}
  />
);
}

export default App;