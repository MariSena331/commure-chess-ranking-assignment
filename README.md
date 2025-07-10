# ♟️ Chess Ranking Assignment – Mariana Sena

This project was developed as part of a front-end technical challenge. The goal is to consume the public [Lichess API](https://lichess.org/api) and build an accessible and functional interface that displays leaderboard and rating history data for the top **Classical** chess players.

---

## 🧠 Technical Decisions

- **Architecture:** Atomic Design
- **Framework:** React (CRA) with TypeScript
- **State Management:** React Context + useState
- **CSV:** Generated dynamically using `Blob` + manual download trigger
- **Responsiveness:** Fully responsive UI

---

## 📁 Project Structure

src/
├── components/ # Atomic UI components (Header, PlayerList, Footer, etc)
├── services/ # API fetch functions
├── types/ # TypeScript definitions
├── utils/ # Helpers (formatting, normalization, CSV generation)
├── assets/ # Logo and images
├── App.tsx # Main component
└── index.tsx

---

## 📦 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chess-ranking-assignment.git
cd chess-ranking-assignment
npm install
npm run start
```
