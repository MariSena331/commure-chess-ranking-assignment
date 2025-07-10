export const formatContinuousRating = (
  points: number[][]
): Record<string, number> => {
  const today = new Date();
  const ratingHistory: Record<string, number> = {};

  const sortedPoints = [...points].sort((a, b) => {
    const dateA = new Date(a[0], a[1], a[2]).getTime();
    const dateB = new Date(b[0], b[1], b[2]).getTime();

    return dateA - dateB;
  });

  let currentRating = sortedPoints.length > 0 ? sortedPoints[0][3] : 0;

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateKey = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const matching = sortedPoints.find(
      ([year, month, day]) =>
        year === date.getFullYear() &&
        month === date.getMonth() &&
        day === date.getDate()
    );

    if (matching) currentRating = matching[3];
    ratingHistory[dateKey] = currentRating;
  }

  return ratingHistory;
};
