import { RatingPoint } from "../types/ratingPoint";

export async function getLast30Days(username: string): Promise<RatingPoint[]> {
  const response = await fetch(
    `https://lichess.org/api/user/${username}/rating-history`
  );

  return response.json();
}
