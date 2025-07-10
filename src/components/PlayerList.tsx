import React from "react";
import styles from "./PlayerList.module.css";

interface PlayerListProps {
  players: string[];
}

export const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Chess Ranking – Top 50 Players</h1>

      <div className={styles.scrollContainer}>
        <ul className={styles.list}>
          {players.map((player, index) => (
            <li
              key={player}
              className={`${styles.item} ${
                index === 0
                  ? styles.gold
                  : index === 1
                  ? styles.silver
                  : index === 2
                  ? styles.bronze
                  : ""
              }`}
            >
              <div className={styles.rankBox}>
                <span className={styles.rank}>#{index + 1}</span>
              </div>
              <span className={styles.username}>{player}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
