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