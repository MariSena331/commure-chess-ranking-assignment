import { useEffect, useState } from "react";

import { fetchTop50Players } from "./services/fetchTop50Players";
import { getLast30Days } from "./services/getLast30Days";

import { Player } from "./types/players";
import { RatingPoint } from "./types/ratingPoint";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [firstPlayer, setFirstPlayer] = useState<string>("");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [classicalRatingTop1, setClassicalRatingTop1] = useState<number[][]>(
    []
  );

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchTop50Players();
        const topPlayer = data.users[0].username;
        setPlayers(data.users);

        if (topPlayer) {
          setFirstPlayer(topPlayer);
          const result: RatingPoint[] = await getLast30Days(topPlayer);
          if (result.length > 0) {
            const classical = result.find((r: any) => r.name === "Classical");
            if (classical) {
              setClassicalRatingTop1(classical.points);
            }
          }
        }
      } catch (error: any) {
        setError(`Error fetching players: ${error.message || "Unknown error"}`);
      }
    };

    loadPlayers();
  }, []);

  const formatContinuousRating = (
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

  useEffect(() => {
    setRatings(formatContinuousRating(classicalRatingTop1));
  }, [classicalRatingTop1]);

  return (
    <div>
      <header>
        <div>
          <h1>Chess Ranking - Top 50 Players</h1>
          {!error && (
            <ul>
              {players.map((player) => (
                <li key={player.username}>
                  <strong>{player.username}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
        <br />
        <div>
          <h1>Rating History for the #1 player - {firstPlayer}</h1>
          <span>last 30 days</span>
          {ratings &&
            Object.entries(ratings).map(([date, rating]) => (
              <li key={date}>
                {date}: {rating},
              </li>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
