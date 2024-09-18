import { PlayerDto } from "@components/players/playerObject";
import { scoreHandler } from "./scoreHandler";
import { Game } from "./Game";
import { gameType } from "./gameType";


export type gameHelperType = {
    generateNewGame: (typeOfGame: gameType) => Game;
    setPlayers: (players: PlayerDto[]) => void;
    getPlayers: () => PlayerDto[] | undefined;
    getGame: () => Game;
    scoreHandler: () => scoreHandler;
};
