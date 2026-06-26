import { useWorkflowContext } from "../context/WorkflowContext";

export function useWorkflow() {
  return useWorkflowContext();
}