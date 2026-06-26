import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Task } from "../types/task";

type WorkflowContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTaskPeople: (
    taskId: string,
    people: string[]
  ) => void;
};

const WorkflowContext =
  createContext<WorkflowContextType | undefined>(
    undefined
  );

type WorkflowProviderProps = {
  children: ReactNode;
};

export function WorkflowProvider({
  children,
}: WorkflowProviderProps) {
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

    setTasks((current) => [...current, newTask]);
  }

  function updateTaskPeople(
    taskId: string,
    people: string[]
  ) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, people }
          : task
      )
    );
  }

  return (
    <WorkflowContext.Provider
      value={{
        tasks,
        addTask,
        updateTaskPeople,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflowContext() {
  const context = useContext(WorkflowContext);

  if (!context) {
    throw new Error(
      "useWorkflowContext must be used inside WorkflowProvider"
    );
  }

  return context;
}