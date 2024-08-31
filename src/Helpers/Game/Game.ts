import { PlayerDto } from "../../library/components/players/playerObject";
import { GameState } from "./GameState";
import { gameType } from "./gameType";
import { state } from "./state";

export interface Game {
    gameType: gameType;
    state: state;
    bonusScore: number;
    players?: PlayerDto[];
    upper?: Array<GameState>;
    middle?: Array<GameState>;
    lower?: Array<GameState>;
};
