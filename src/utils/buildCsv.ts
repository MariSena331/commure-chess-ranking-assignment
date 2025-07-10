import { downloadFile } from "./downloadFile";
import { getClassicalRatingHistory } from "./getClassicalRatingHistory";
import { getLast30DateStrings } from "./getLast30DateStrings";
import { mapWithConcurrency } from "./mapWithConcurrency";

export const buildAndDownloadCsv = async (usernames: string[]) => {
  const dates = getLast30DateStrings();
  const header = ["username", ...dates].join(",");

  const rows = await mapWithConcurrency(usernames, async (username) => {
    const history = await getClassicalRatingHistory(username);

    if (!history || history.points.length === 0) {
      console.warn(`No classical rating history found for ${username}`);
      return [username, ...Array(dates.length).fill("N/A")].join(",");
    }

    const normalized = normalizeContinuous(history.points, dates);
    return [username, ...normalized].join(",");
  });

  const csvContent = [header, ...rows].join("\n");
  downloadFile("chess_ratings.csv", csvContent);
};

const normalizeContinuous = (points: number[][], dates: string[]): number[] => {
  points.sort(
    (a, b) =>
      new Date(a[0], a[1], a[2]).getTime() -
      new Date(b[0], b[1], b[2]).getTime()
  );

  let idx = 0;
  let lastRating = points[0]?.[3] ?? 0;

  return dates.map((iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    while (
      idx < points.length &&
      points[idx][0] === y &&
      points[idx][1] === m - 1 &&
      points[idx][2] === d
    ) {
      lastRating = points[idx][3];
      idx++;
    }
    return lastRating;
  });
};
