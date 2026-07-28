import type { Task } from "../types/task";

const TASK_STORAGE_KEY = "workflow-pro.tasks.v1";

export function loadTasks(): Task[] {
  try {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks: unknown = JSON.parse(storedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks as Task[];
  } catch (error) {
    console.error("Unable to load Workflow Pro tasks:", error);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(
      TASK_STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error("Unable to save Workflow Pro tasks:", error);
  }
}