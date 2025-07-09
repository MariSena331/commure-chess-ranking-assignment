import { useEffect, useState } from "react";

import { fetchTop50Players } from "./services/fetchTop50Players";
import { Player } from "./types/players";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchTop50Players();
        setPlayers(data.users);
      } catch (error) {
        setError("Error fetching players.");
      }
    };

    loadPlayers();
  }, []);

  return (
    <div>
      <header>
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
      </header>
    </div>
  );
}

export default App;
