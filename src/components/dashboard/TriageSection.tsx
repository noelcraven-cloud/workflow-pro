import { useState } from "react";

import type { Task } from "../../types/task";
import { favouritePeople } from "../../data/favourites";
import Section from "../common/Section";

type TriageSectionProps = {
  tasks: Task[];
  updateTaskPeople: (taskId: string, people: string[]) => void;
  updateTaskRanks: (
    taskId: string,
    personRanks: Record<string, number>
  ) => void;
  updateTaskProject: (
    taskId: string,
    project: string
  ) => void;
};

function TriageSection({
  tasks,
  updateTaskPeople,
  updateTaskRanks,
  updateTaskProject,
}: TriageSectionProps) {
  const [editingPeopleTaskId, setEditingPeopleTaskId] =
    useState<string | null>(null);

  const [editingWorkflowTaskId, setEditingWorkflowTaskId] =
    useState<string | null>(null);

  const [editingProjectTaskId, setEditingProjectTaskId] =
    useState<string | null>(null);

  const [selectedPeople, setSelectedPeople] =
    useState<string[]>([]);

  const [rankInputs, setRankInputs] =
    useState<Record<string, string>>({});

  const [projectInput, setProjectInput] = useState("");

  function beginPeopleAssignment(task: Task) {
    setEditingPeopleTaskId(task.id);
    setSelectedPeople(task.people);
  }

  function togglePerson(person: string) {
    setSelectedPeople((current) =>
      current.includes(person)
        ? current.filter((item) => item !== person)
        : [...current, person]
    );
  }

  function savePeople() {
    if (!editingPeopleTaskId) return;

    updateTaskPeople(
      editingPeopleTaskId,
      selectedPeople
    );

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

  function updateRankInput(
    person: string,
    value: string
  ) {
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

  function beginProjectAssignment(task: Task) {
    setEditingProjectTaskId(task.id);
    setProjectInput(task.project ?? "");
  }

  function saveProject(task: Task) {
    updateTaskProject(task.id, projectInput);

    setEditingProjectTaskId(null);
    setProjectInput("");
  }

  function hasWorkflow(task: Task) {
    return (
      task.taskType === "RANKED" &&
      task.personRanks &&
      Object.keys(task.personRanks).length > 0
    );
  }

  return (
    <>
      <Section
        title="📥 Triage"
        count={tasks.length}
      />

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid lightgrey",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <input
              type="checkbox"
              disabled
              style={{ marginRight: "12px" }}
            />

            <strong>{task.title}</strong>
          </div>

          <div style={{ marginBottom: "8px" }}>
            People:{" "}
            {task.people.length > 0
              ? task.people.join(" & ")
              : "Unassigned"}
          </div>

          {hasWorkflow(task) && (
            <div style={{ marginBottom: "8px" }}>
              Workflow: Ranked
              <br />

              {Object.entries(
                task.personRanks ?? {}
              ).map(([person, rank]) => (
                <span key={person}>
                  {person}: P{rank}{" "}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginBottom: "12px" }}>
            Project:{" "}
            {task.project
              ? task.project
              : "Unassigned"}
          </div>

          {editingPeopleTaskId === task.id ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                {favouritePeople.map((person) => (
                  <button
                    key={person}
                    onClick={() =>
                      togglePerson(person)
                    }
                  >
                    {selectedPeople.includes(person)
                      ? `✓ ${person}`
                      : person}
                  </button>
                ))}
              </div>

              <button onClick={savePeople}>
                Save People
              </button>
            </>
          ) : editingWorkflowTaskId === task.id ? (
            <div
              style={{
                borderTop:
                  "1px solid lightgrey",
                paddingTop: "12px",
              }}
            >
              <strong>Ranked Workflow</strong>

              {task.people.map((person) => (
                <div
                  key={person}
                  style={{ marginTop: "12px" }}
                >
                  <label>
                    {person} rank:
                    <input
                      type="number"
                      min="1"
                      value={
                        rankInputs[person] ?? ""
                      }
                      onChange={(event) =>
                        updateRankInput(
                          person,
                          event.target.value
                        )
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

              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() =>
                    saveRankedWorkflow(task)
                  }
                >
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
          ) : editingProjectTaskId === task.id ? (
            <div
              style={{
                borderTop:
                  "1px solid lightgrey",
                paddingTop: "12px",
              }}
            >
              <strong>Assign Project</strong>

              <div style={{ marginTop: "12px" }}>
                <input
                  value={projectInput}
                  onChange={(event) =>
                    setProjectInput(
                      event.target.value
                    )
                  }
                  placeholder="Project name"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "12px",
                  }}
                />

                <button
                  onClick={() =>
                    saveProject(task)
                  }
                >
                  Save Project
                </button>
              </div>
            </div>
          ) : task.people.length === 0 ? (
            <button
              onClick={() =>
                beginPeopleAssignment(task)
              }
            >
              Assign People
            </button>
          ) : !hasWorkflow(task) ? (
            <button
              onClick={() =>
                beginWorkflowAssignment(task)
              }
            >
              Assign Workflow
            </button>
          ) : !task.project ? (
            <button
              onClick={() =>
                beginProjectAssignment(task)
              }
            >
              Assign Project
            </button>
          ) : null}
        </div>
      ))}
    </>
  );
}

export default TriageSection;