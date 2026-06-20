export type Task = {
  id: string;
  title: string;
  status: "TRIAGE" | "ACTIVE" | "COMPLETED";
};