import { Game } from "./Game";
import { GameScore } from "./GameScore";
import { GameState } from "./GameState";
import { PlayerScore } from "./PlayerScore";
import { playerTotalScore } from "./playerTotalScore";


export type scoreHandler = {
    updatePlayerScore: (scoreToBeUpdated: GameScore, score: PlayerScore) => Game;
    getPlayersTotalScore: (gameState: GameState[] | undefined, upperGameState: GameState[] | undefined) => Array<playerTotalScore>;
};
