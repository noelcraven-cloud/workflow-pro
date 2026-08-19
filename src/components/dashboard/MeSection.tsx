import { useState } from "react";

import type { Task } from "../../types/task";
import ActiveTaskCard from "../active/ActiveTaskCard";
import Section from "../common/Section";

type MeSectionProps = {
  tasks: Task[];

  completeTask: (taskId: string) => void;

  updateTaskTitle: (
    taskId: string,
    title: string
  ) => void;

  moveTaskRank: (
    taskId: string,
    person: string,
    requestedRank: number
  ) => void;

  updateTaskProject: (
    taskId: string,
    project: string
  ) => void;
};

function MeSection({
  tasks,
  completeTask,
  updateTaskTitle,
  moveTaskRank,
  updateTaskProject,
}: MeSectionProps) {
  const [showAllTasks, setShowAllTasks] = useState(false);

  const visibleTasks = tasks.filter((task) => {
    const rank =
      task.personRanks?.Me ?? Number.MAX_SAFE_INTEGER;

    return showAllTasks || rank <= 3;
  });

  const hasP4Plus = tasks.some(
    (task) =>
      (task.personRanks?.Me ?? Number.MAX_SAFE_INTEGER) > 3
  );

  return (
    <>
      <Section
        title="👤 Me"
        count={tasks.length}
      />

      {visibleTasks.map((task) => (
        <ActiveTaskCard
  key={task.id}
  task={task}
  rank={task.personRanks?.Me}
  onComplete={completeTask}
  onUpdateTitle={updateTaskTitle}
  onMoveRank={moveTaskRank}
  onUpdateProject={updateTaskProject}
/>
      ))}

      {hasP4Plus && (
        <button
          type="button"
          onClick={() =>
            setShowAllTasks((current) => !current)
          }
        >
          {showAllTasks ? "Hide P4+" : "Show P4+"}
        </button>
      )}
    </>
  );
}

export default MeSection;