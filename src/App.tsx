import { useState } from "react";

import Home from "./components/Home";
import type { Task } from "./types/task";

function App() {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Welcome to Workflow Pro",
      status: "TRIAGE",
      people: [],
      taskType: "RANKED",
    },
  ]);

  const triageCount = tasks.filter(
    (task) => task.status === "TRIAGE"
  ).length;

  return <Home triageCount={triageCount} />;
}

export default App;