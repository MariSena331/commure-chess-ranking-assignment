import { Player } from "../types/players";

type PropsTop50PlayersRequest = {
  users: Player[];
};

export async function fetchTop50Players(): Promise<PropsTop50PlayersRequest> {
  const response = await fetch(
    "https://lichess.org/api/player/top/50/classical"
  );

  return response.json();
}
