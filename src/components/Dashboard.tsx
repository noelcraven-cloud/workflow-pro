import { useState } from "react";
import type { Task } from "../types/task";
import { favouritePeople } from "../data/favourites";

type DashboardProps = {
  triageCount: number;
  triageTasks: Task[];
  addTask: (title: string) => void;
  updateTaskPeople: (taskId: string, people: string[]) => void;
  updateTaskRanks: (
    taskId: string,
    personRanks: Record<string, number>
  ) => void;
};

function Dashboard({
  triageCount,
  triageTasks,
  addTask,
  updateTaskPeople,
  updateTaskRanks,
}: DashboardProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingPeopleTaskId, setEditingPeopleTaskId] = useState<string | null>(null);
  const [editingWorkflowTaskId, setEditingWorkflowTaskId] = useState<string | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [rankInputs, setRankInputs] = useState<Record<string, string>>({});

  function createTask() {
    addTask(taskTitle);
    setTaskTitle("");
    setShowQuickAdd(false);
  }

  function beginPeopleAssignment(task: Task) {
    setEditingPeopleTaskId(task.id);
    setSelectedPeople(task.people);
  }

  function togglePerson(person: string) {
    setSelectedPeople((current) =>
      current.includes(person)
        ? current.filter((p) => p !== person)
        : [...current, person]
    );
  }

  function savePeople() {
    if (!editingPeopleTaskId) return;
    updateTaskPeople(editingPeopleTaskId, selectedPeople);
    setEditingPeopleTaskId(null);
    setSelectedPeople([]);
  }

  function beginWorkflowAssignment(task: Task) {
    setEditingWorkflowTaskId(task.id);

    const existingRanks: Record<string, string> = {};
    task.people.forEach((person) => {
      existingRanks[person] =
        task.personRanks?.[person]?.toString() ?? "";
    });

    setRankInputs(existingRanks);
  }

  function updateRankInput(person: string, value: string) {
    setRankInputs((current) => ({
      ...current,
      [person]: value,
    }));
  }

  function saveRankedWorkflow(task: Task) {
    const personRanks: Record<string, number> = {};

    task.people.forEach((person) => {
      const parsedRank = Number(rankInputs[person]);
      personRanks[person] =
        Number.isFinite(parsedRank) && parsedRank > 0
          ? Math.floor(parsedRank)
          : 1;
    });

    updateTaskRanks(task.id, personRanks);
    setEditingWorkflowTaskId(null);
    setRankInputs({});
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1>Workflow Pro</h1>
      </div>

      {showQuickAdd && (
        <div style={{ border: "1px solid lightgrey", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
          <h3>Quick Add</h3>
          <input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="Task title"
            style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
          />
          <button onClick={createTask}>Create</button>
        </div>
      )}

      <Section title="📥 Triage" count={triageCount} />

      {triageTasks.map((task) => (
        <div key={task.id} style={{ padding: "12px", marginBottom: "12px", border: "1px solid lightgrey", borderRadius: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <input type="checkbox" disabled style={{ marginRight: "12px" }} />
            <strong>{task.title}</strong>
          </div>

          <div style={{ marginBottom: "8px" }}>
            People: {task.people.length > 0 ? task.people.join(" & ") : "Unassigned"}
          </div>

          {task.people.length > 0 && task.personRanks && Object.keys(task.personRanks).length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              Workflow: Ranked
              <br />
              {Object.entries(task.personRanks).map(([person, rank]) => (
                <span key={person}>
                  {person}: P{rank}{" "}
                </span>
              ))}
            </div>
          )}

          {editingPeopleTaskId === task.id ? (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                {favouritePeople.map((person) => (
                  <button key={person} onClick={() => togglePerson(person)}>
                    {selectedPeople.includes(person) ? `✓ ${person}` : person}
                  </button>
                ))}
              </div>
              <button onClick={savePeople}>Save People</button>
            </>
          ) : editingWorkflowTaskId === task.id ? (
            <div style={{ borderTop: "1px solid lightgrey", paddingTop: "12px" }}>
              <strong>Ranked Workflow</strong>

              {task.people.map((person) => (
                <div key={person} style={{ marginTop: "12px" }}>
                  <label>
                    {person} rank:
                    <input
                      type="number"
                      min="1"
                      value={rankInputs[person] ?? ""}
                      onChange={(event) =>
                        updateRankInput(person, event.target.value)
                      }
                      style={{
                        marginLeft: "8px",
                        width: "80px",
                        padding: "6px",
                      }}
                    />
                  </label>
                </div>
              ))}

              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                <button onClick={() => saveRankedWorkflow(task)}>
                  Save Ranked Workflow
                </button>

                <button
                  onClick={() => {
                    setEditingWorkflowTaskId(null);
                    setRankInputs({});
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : task.people.length === 0 ? (
            <button onClick={() => beginPeopleAssignment(task)}>Assign People</button>
          ) : (
            <button onClick={() => beginWorkflowAssignment(task)}>
              Assign Workflow
            </button>
          )}
        </div>
      ))}

      <Section title="👤 Me" count={0} />
      <Section title="👥 Team" count={0} />
      <Section title="🔄 BAU" count={0} />
      <Section title="👤 By Person" count={0} />
      <Section title="🏷️ By Project" count={0} />
      <Section title="✅ Completed" count={0} />

      <button
        onClick={() => setShowQuickAdd(!showQuickAdd)}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "36px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          zIndex: 1000,
        }}
      >
        +
      </button>
    </div>
  );
}

type SectionProps = {
  title: string;
  count: number;
};

function Section({ title, count }: SectionProps) {
  return (
    <div style={{ borderBottom: "1px solid lightgrey", padding: "16px 0" }}>
      <h2>{title} ({count})</h2>
    </div>
  );
}

export default Dashboard;