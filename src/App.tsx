import { useEffect, useState } from "react";

import styles from "./App.module.css";
import logo from "./assets/commure-logo.webp";

import { fetchTop50Players } from "./services/fetchTop50Players";
import { formatContinuousRating } from "./utils/formatContinuousRating";

import { Player } from "./types/players";
import { getClassicalRatingHistory } from "./utils/getClassicalRatingHistory";
import { RatingChart } from "./components/RatingChart";
import { PlayerList } from "./components/PlayerList";

function App() {
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  useEffect(() => {
    setRatings(formatContinuousRating(classicalRatingTop1));
  }, [classicalRatingTop1]);

  return (
    <div className={styles.app}>
      <nav className={styles.navbar}>
        <img src={logo} alt="Commure Logo" className={styles.logo} />
        <h1 className={styles.title}>
          Chess Ranking Assignment – Mariana Sena
        </h1>
      </nav>
      {error ? (
        <div className={styles.errorContainer}>
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <main className={styles.fadeIn}>
          <PlayerList players={players.map((player) => player.username)} />
          <RatingChart firstPlayer={firstPlayer} ratings={ratings} />
        </main>
      )}
    </div>
  );
}

export default App;
