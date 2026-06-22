export type Task = {
  id: string;

  title: string;

  status: "TRIAGE" | "ACTIVE" | "COMPLETED";

  people: string[];

  rank?: number;

  project?: string;

  taskType: "RANKED" | "BAU_WEEKLY" | "BAU_MONTHLY";

  outlookLink?: string;
};