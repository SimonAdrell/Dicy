import { PlayerDto } from "@components/players/playerObject";
import { scoreHandler } from "./scoreHandler";
import { Game } from "./Game";
import { gameType } from "./gameType";
import { TFunction } from "i18next";


export type gameHelperType = {
    generateNewGame: (typeOfGame: gameType) => Game;
    setPlayers: (players: PlayerDto[], t: TFunction<"translation", undefined>) => void;
    getPlayers: () => PlayerDto[] | undefined;
    getGame: () => Game;
    scoreHandler: () => scoreHandler;
};
