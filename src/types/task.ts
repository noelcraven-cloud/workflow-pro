export type Task = {
  id: string;

  title: string;

  status: "TRIAGE" | "ACTIVE" | "COMPLETED";

  people: string[];

  personRanks?: Record<string, number>;

  rank?: number;

  project?: string;

  taskType: "RANKED" | "BAU_WEEKLY" | "BAU_MONTHLY";

  createdAt: string;

  outlookLink?: string;
};