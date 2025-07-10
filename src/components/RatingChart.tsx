import React from "react";
import styles from "./RatingChart.module.css";

interface RatingChartProps {
  firstPlayer: string;
  ratings: Record<string, number>;
}

export const RatingChart: React.FC<RatingChartProps> = ({
  firstPlayer,
  ratings,
}) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Rating History for the #1 player —{" "}
        <span className={styles.player}>{firstPlayer}</span>
      </h1>
      <p className={styles.subtitle}>Last 30 days</p>
      <ul className={styles.list}>
        {ratings &&
          Object.entries(ratings).map(([date, rating]) => (
            <li key={date} className={styles.item}>
              <span className={styles.date}>{date}:</span>{" "}
              <span className={styles.rating}>{rating}</span>
            </li>
          ))}
      </ul>
    </section>
  );
};
