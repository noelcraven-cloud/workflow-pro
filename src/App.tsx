import { useEffect, useState } from "react";

import Dashboard from "./components/dashboard/Dashboard";
import type { Task } from "./types/task";
import { normaliseRank } from "./utils/ranking";
import {
  loadTasks,
  saveTasks,
} from "./utils/taskStorage";

function App() {
const [tasks, setTasks] = useState<Task[]>(loadTasks);

useEffect(() => {
  saveTasks(tasks);
}, [tasks]);

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

    Object.entries(personRanks).forEach(
      ([person, requestedRank]) => {
        const existingTasksForPerson = updatedTasks.filter(
          (task) =>
            task.id !== taskId &&
            task.status !== "COMPLETED" &&
            task.people.includes(person) &&
            task.personRanks?.[person] !== undefined
        );

        const insertionRank = normaliseRank(
          requestedRank,
          existingTasksForPerson.length
        );

        updatedTasks = updatedTasks.map((task) => {
          if (task.id === taskId) {
            const updatedPersonRanks = {
              ...(task.personRanks ?? {}),
              [person]: insertionRank,
            };

            const hasRankForEveryPerson =
              task.people.length > 0 &&
              task.people.every(
                (assignedPerson) =>
                  updatedPersonRanks[assignedPerson] !==
                  undefined
              );

            return {
              ...task,
              taskType: "RANKED",
              personRanks: updatedPersonRanks,
              status: hasRankForEveryPerson
                ? "ACTIVE"
                : task.status,
            };
          }

          const existingRank = task.personRanks?.[person];

          const isRankedForPerson =
            task.status !== "COMPLETED" &&
            task.people.includes(person) &&
            existingRank !== undefined;

          if (
            isRankedForPerson &&
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
      }
    );

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

function completeTask(taskId: string) {
  setTasks((currentTasks) => {
    const completedTask = currentTasks.find(
      (task) => task.id === taskId
    );

    if (!completedTask) return currentTasks;

    const completedRanks = completedTask.personRanks ?? {};

    return currentTasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: "COMPLETED",
        };
      }

      const updatedRanks = {
        ...(task.personRanks ?? {}),
      };

      let ranksChanged = false;

      Object.entries(completedRanks).forEach(
        ([person, completedRank]) => {
          const existingRank = updatedRanks[person];

          if (
            existingRank !== undefined &&
            existingRank > completedRank
          ) {
            updatedRanks[person] = existingRank - 1;
            ranksChanged = true;
          }
        }
      );

      return ranksChanged
        ? { ...task, personRanks: updatedRanks }
        : task;
    });
  });
}

function deleteTask(taskId: string) {
  setTasks((currentTasks) =>
    currentTasks.filter((task) => task.id !== taskId)
  );
}

function restoreTask(taskId: string) {
  setTasks((currentTasks) => {
    const taskToRestore = currentTasks.find(
      (task) => task.id === taskId
    );

    if (!taskToRestore) {
      return currentTasks;
    }

    let updatedTasks = [...currentTasks];

    taskToRestore.people.forEach((person) => {
      const requestedRank =
        taskToRestore.personRanks?.[person] ?? 1;

      const existingTasksForPerson = updatedTasks.filter(
        (task) =>
          task.id !== taskId &&
          task.status !== "COMPLETED" &&
          task.people.includes(person) &&
          task.personRanks?.[person] !== undefined
      );

      const restoredRank = normaliseRank(
        requestedRank,
        existingTasksForPerson.length
      );

      updatedTasks = updatedTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: "ACTIVE",
            taskType: "RANKED",
            personRanks: {
              ...(task.personRanks ?? {}),
              [person]: restoredRank,
            },
          };
        }

        const existingRank = task.personRanks?.[person];

        if (
          task.status !== "COMPLETED" &&
          task.people.includes(person) &&
          existingRank !== undefined &&
          existingRank >= restoredRank
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

const triageTasks = tasks.filter((task) => task.status === "TRIAGE");

const activeTasks = tasks.filter(
  (task) => task.status === "ACTIVE"
);

const completedTasks = tasks.filter(
  (task) => task.status === "COMPLETED"
);

  return (
  <Dashboard
    triageCount={triageTasks.length}
    triageTasks={triageTasks}
    activeTasks={activeTasks}
    completedTasks={completedTasks}
    addTask={addTask}
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