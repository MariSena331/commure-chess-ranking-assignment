import { getLast30Days } from "../services/getLast30Days";

import { RatingPoint } from "../types/ratingPoint";

export const getClassicalRatingHistory = async (
  playerUsername: string
): Promise<RatingPoint | undefined> => {
  const result: RatingPoint[] = await getLast30Days(playerUsername);
  if (result.length > 0) {
    return result.find((r: any) => r.name === "Classical");
  }
};
