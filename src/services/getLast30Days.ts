import { RatingPoint } from "../types/ratingPoint";

export async function getLast30Days(username: string): Promise<RatingPoint[]> {
  const response = await fetch(
    `https://lichess.org/api/user/${username}/rating-history`
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching rating history for ${username}: ${response.statusText}`
    );
  }

  return response.json() as Promise<RatingPoint[]>;
}
