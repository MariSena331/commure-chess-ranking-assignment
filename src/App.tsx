import { useEffect, useState } from "react";

import { fetchTop50Players } from "./services/fetchTop50Players";
import { formatContinuousRating } from "./utils/formatContinuousRating";

import { Player } from "./types/players";
import { getClassicalRatingHistory } from "./utils/getClassicalRatingHistory";

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
        const topPlayer: string = data.users[0].username;
        setPlayers(data.users);

        if (topPlayer) {
          setFirstPlayer(topPlayer);
          const classical = await getClassicalRatingHistory(topPlayer);
          if (classical) {
            setClassicalRatingTop1(classical.points);
          }
        }
      } catch (error: any) {
        setError(`Error fetching players: ${error.message || "Unknown error"}`);
      }
    };

    loadPlayers();
  }, []);

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
        <div></div>
      </header>
    </div>
  );
}

export default App;
