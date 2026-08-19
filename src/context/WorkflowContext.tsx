import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useTasks } from "../hooks/useTasks";

type WorkflowContextValue =
  ReturnType<typeof useTasks>;

const WorkflowContext =
  createContext<WorkflowContextValue | undefined>(
    undefined
  );

type WorkflowProviderProps = {
  children: ReactNode;
};

export function WorkflowProvider({
  children,
}: WorkflowProviderProps) {
  const workflow = useTasks();

  return (
    <WorkflowContext.Provider value={workflow}>
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