import { useState } from "react";

import Dashboard from "./components/Dashboard";
import type { Task } from "./types/task";
import { normaliseRank } from "./utils/ranking";

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

  function updateTaskPeople(taskId: string, people: string[]) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, people } : task
      )
    );
  }

  function updateTaskRanks(
  taskId: string,
  personRanks: Record<string, number>
) {
  setTasks((currentTasks) => {
    let updatedTasks = [...currentTasks];

    Object.entries(personRanks).forEach(([person, requestedRank]) => {
      const existingTasksForPerson = updatedTasks.filter(
        (task) =>
          task.id !== taskId &&
          task.status === "ACTIVE" &&
          task.people.includes(person) &&
          task.personRanks?.[person] !== undefined
      );

      const insertionRank = normaliseRank(
        requestedRank,
        existingTasksForPerson.length
      );

      updatedTasks = updatedTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            taskType: "RANKED",
            personRanks: {
              ...(task.personRanks ?? {}),
              [person]: insertionRank,
            },
          };
        }

        const existingRank = task.personRanks?.[person];

        if (
          existingRank !== undefined &&
          existingRank >= insertionRank
        ) {
          return {
            ...task,
            personRanks: {
              ...(task.personRanks ?? {}),
              [person]: existingRank + 1,
            },
          };
        }

        return task;
      });
    });

    return updatedTasks;
  });
}

 function updateTaskProject(taskId: string, project: string) {
  const trimmedProject = project.trim();

  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            project: trimmedProject,
            status: trimmedProject ? "ACTIVE" : task.status,
          }
        : task
    )
  );
}

const triageTasks = tasks.filter((task) => task.status === "TRIAGE");

const activeTasks = tasks.filter((task) => task.status === "ACTIVE");

  return (
    <Dashboard
      triageCount={triageTasks.length}
      triageTasks={triageTasks}
      activeTasks={activeTasks}
      addTask={addTask}
      updateTaskPeople={updateTaskPeople}
      updateTaskRanks={updateTaskRanks}
      updateTaskProject={updateTaskProject}
    />
  );
}

export default App;