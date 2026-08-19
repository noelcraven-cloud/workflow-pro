import { useState } from "react";

import type { Task } from "../../types/task";

type ActiveTaskCardProps = {
  task: Task;
  rank?: number;

  onComplete: (taskId: string) => void;

  onUpdateTitle: (
    taskId: string,
    title: string
  ) => void;

  onUpdateProject: (
    taskId: string,
    project: string
  ) => void;
};

function ActiveTaskCard({
  task,
  rank,
  onComplete,
  onUpdateTitle,
  onUpdateProject,
}: ActiveTaskCardProps) {
  const [isEditingTitle, setIsEditingTitle] =
    useState(false);

  const [titleInput, setTitleInput] =
    useState(task.title);

  const [isEditingProject, setIsEditingProject] =
    useState(false);

  const [projectInput, setProjectInput] =
    useState(task.project ?? "");

  function saveTitle() {
    const trimmedTitle = titleInput.trim();

    if (!trimmedTitle) {
      return;
    }

    onUpdateTitle(task.id, trimmedTitle);

    setIsEditingTitle(false);
  }

  function cancelTitleEdit() {
    setTitleInput(task.title);
    setIsEditingTitle(false);
  }

  function saveProject() {
    onUpdateProject(task.id, projectInput);
    setIsEditingProject(false);
  }

  function cancelProjectEdit() {
    setProjectInput(task.project ?? "");
    setIsEditingProject(false);
  }

  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: "10px",
        padding: "14px",
        marginBottom: "10px",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <input
          type="checkbox"
          aria-label={`Complete ${task.title}`}
          onChange={() => onComplete(task.id)}
        />

        <div style={{ flex: 1 }}>
          {isEditingTitle ? (
            <div style={{ marginBottom: "10px" }}>
              <input
                value={titleInput}
                onChange={(event) =>
                  setTitleInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    saveTitle();
                  }
                }}
                autoFocus
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={saveTitle}
                >
                  Save Title
                </button>

                <button
                  type="button"
                  onClick={cancelTitleEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              {rank ? `P${rank} ` : ""}
              {task.title}

              <button
                type="button"
                onClick={() => {
                  setTitleInput(task.title);
                  setIsEditingTitle(true);
                }}
                style={{
                  marginLeft: "10px",
                }}
              >
                Edit Title
              </button>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <div>
              📁 <strong>Project:</strong>{" "}
              {task.project || "None"}
            </div>

            <div>
              👥 <strong>People:</strong>{" "}
              {task.people.join(" & ")}
            </div>

            <div>
              🗂 <strong>Workflow:</strong>{" "}
              Ranked
            </div>
          </div>

          {isEditingProject ? (
            <div style={{ marginTop: "12px" }}>
              <input
                value={projectInput}
                onChange={(event) =>
                  setProjectInput(event.target.value)
                }
                placeholder="Project name"
                autoFocus
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={saveProject}
                >
                  Save Project
                </button>

                <button
                  type="button"
                  onClick={cancelProjectEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setProjectInput(
                  task.project ?? ""
                );

                setIsEditingProject(true);
              }}
              style={{
                marginTop: "12px",
              }}
            >
              {task.project
                ? "Edit Project"
                : "Assign Project"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveTaskCard;