import { PlayerScore } from "./PlayerScore";
import { GameScore } from "./GameScore";


export interface GameState {
    score: GameScore;
    PlayerScore: Array<PlayerScore>;
}
