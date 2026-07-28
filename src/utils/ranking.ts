export function normaliseRank(
  requestedRank: number,
  currentTaskCount: number
): number {
  const safeRequestedRank = Number.isFinite(requestedRank)
    ? Math.floor(requestedRank)
    : 1;

  const safeTaskCount = Math.max(
    0,
    Math.floor(currentTaskCount)
  );

  const maximumInsertionRank = safeTaskCount + 1;

  return Math.max(
    1,
    Math.min(safeRequestedRank, maximumInsertionRank)
  );
}

export function shiftRanksDown(
  existingRanks: Record<string, number>,
  insertionRank: number
): Record<string, number> {
  const updatedRanks: Record<string, number> = {};

  for (const [person, existingRank] of Object.entries(
    existingRanks
  )) {
    updatedRanks[person] =
      existingRank >= insertionRank
        ? existingRank + 1
        : existingRank;
  }

  return updatedRanks;
}