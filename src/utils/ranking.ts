export function normaliseRank(
  requestedRank: number,
  currentTaskCount: number
): number {
  if (requestedRank < 1) {
    return 1;
  }

  if (requestedRank > currentTaskCount + 1) {
    return currentTaskCount + 1;
  }

  return requestedRank;
}

export function shiftRanksDown(
  existingRanks: Record<string, number>,
  insertionRank: number
): Record<string, number> {
  const updated: Record<string, number> = {};

  for (const person in existingRanks) {
    const rank = existingRanks[person];

    updated[person] =
      rank >= insertionRank
        ? rank + 1
        : rank;
  }

  return updated;
}