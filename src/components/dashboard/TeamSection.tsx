import { useState } from "react";

import type { Task } from "../../types/task";
import ActiveTaskCard from "../active/ActiveTaskCard";
import Section from "../common/Section";

type TeamSectionProps = {
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

function getTeamRank(task: Task): number {
  const teamRanks = task.people
    .map((person) => task.personRanks?.[person])
    .filter((rank): rank is number => rank !== undefined);

  return teamRanks.length > 0
    ? Math.min(...teamRanks)
    : Number.MAX_SAFE_INTEGER;
}

function TeamSection({
  tasks,
  completeTask,
  updateTaskTitle,
  moveTaskRank,
  updateTaskProject,
}: TeamSectionProps) {
  const [showAllTasks, setShowAllTasks] = useState(false);

  const visibleTasks = [...tasks]
  .sort((a, b) => {
    const personA = a.people.join(" & ");
    const personB = b.people.join(" & ");

    if (personA !== personB) {
      return personA.localeCompare(personB);
    }

    return getTeamRank(a) - getTeamRank(b);
  })
  .filter((task) => {
    const rank = getTeamRank(task);

    return showAllTasks || rank === 1;
  });

  const hasP2Plus = tasks.some(
    (task) => getTeamRank(task) > 1
  );

  return (
    <>
      <Section
        title="👥 Team"
        count={tasks.length}
      />

      {visibleTasks.map((task) => (
        <ActiveTaskCard
  key={task.id}
  task={task}
  rank={getTeamRank(task)}
  onComplete={completeTask}
  onUpdateTitle={updateTaskTitle}
  onMoveRank={moveTaskRank}
  onUpdateProject={updateTaskProject}
/>
      ))}

      {hasP2Plus && (
        <button
          type="button"
          onClick={() =>
            setShowAllTasks((current) => !current)
          }
        >
          {showAllTasks ? "Hide P2+" : "Show P2+"}
        </button>
      )}
    </>
  );
}

export default TeamSection;