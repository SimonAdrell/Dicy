import { Game } from "./Game";
import { GameScore } from "./GameScore";
import { PlayerScore } from "./PlayerScore";
import { playerTotalScore } from "./playerTotalScore";


export type scoreHandler = {
    updatePlayerScore: (scoreToBeUpdated: GameScore, score: PlayerScore) => Game;
    getPlayersUpperScore: () => Array<playerTotalScore>;
};
