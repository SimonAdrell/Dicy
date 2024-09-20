import { PlayerDto } from "@components/players/playerObject";
import { GameState } from "./GameState";
import { gameType } from "./gameType";
import { state } from "./state";

export interface Game {
    gameType: gameType;
    state: state;
    bonusScore: number;
    bonusLimit: number;
    numberOfDices?: number 
    players?: PlayerDto[];
    upper?: Array<GameState>;
    middle?: Array<GameState>;
    lower?: Array<GameState>;
};
