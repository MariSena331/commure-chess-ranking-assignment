import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Chess Ranking • Commure Assignment</p>
    </footer>
  );
}
