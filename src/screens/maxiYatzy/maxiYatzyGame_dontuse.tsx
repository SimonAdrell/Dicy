import { PlayerScore } from "../../Helpers/Game/PlayerScore";
import { GameState } from "../../Helpers/Game/GameState";
import { PlayerDto } from "../../library/components/players/playerObject";

export interface Game {
    players: PlayerDto[];
    upper: GameState[];
    middle: GameState[];
    lower: GameState[];
};

const upperNames = ['Ettor', 'Tvåor', 'Treor', 'Fyror', 'Femmor', 'Sexor'];
const middleNames = ['1 par', '2 par', '3 par', 'Tretal', 'Fyrtal', 'Femtal', 'Liten stege', 'Stor stege', 'Full stege', 'Kåk', 'Hus', 'Torn', 'Chans'];
const lowerNames = ['Maxi Yatzy'];


function sumPlayersValidPoints(this: PlayerScore[], playerId : number) : number {
    return this.filter(e => e.player.playerId == playerId && !e.isRemoved)
        .reduce((sum: number, current) => sum + (current.score ?? 0), 0);
}

declare global {
    interface Array<T> {
        sumPlayersValidPoints(playerId: number): number;
    }
  }

Array.prototype.sumPlayersValidPoints = sumPlayersValidPoints;
   
const generateGameState = (names: Array<string>, players: Array<PlayerDto>): Array<GameState> =>  {
    var playerScores: Array<PlayerScore> = []
    
    players.forEach(element => {
        playerScores.push({
            player: element,
            isRemoved: false,
            score: undefined
        })
    });
    
    var gameStates : Array<GameState> =[];
    names.forEach(element => {
        gameStates.push({name: element, PlayerScore: playerScores})
    });
    
    return gameStates;
}

export function generateNewGame (players: Array<PlayerDto>): Game  {
    return {
        players: players,
        upper: generateGameState(upperNames, players),
        middle: generateGameState(middleNames, players),
        lower: generateGameState(lowerNames, players)
    };
}

export function updatePlayerGameScore(playerScore : PlayerScore,name: string, game : Game): Game{
    return {
        players: game.players,
        upper: updateGameState(game.upper,playerScore,name),
        middle: updateGameState(game.middle,playerScore,name),
        lower: updateGameState(game.lower,playerScore,name)
    }
}

function updateGameState(gameState: GameState[],newPlayerScore : PlayerScore, name: string): GameState[] {
    // find matching item
    if(!gameState.some(g => g.name === name))
        return gameState;
    
    var newGameState: GameState[] = [];
    gameState.forEach(element => {
        if(element.name != name){
            newGameState.push(element);
            return;
        }
        const matchesPlayerId = (playerScore: PlayerScore) => playerScore.player.playerId == newPlayerScore.player.playerId
        var indexOfMatchingScore = element.PlayerScore.findIndex(matchesPlayerId)
        if(indexOfMatchingScore == -1){
            newGameState.push(element);
            return;
        }

        var playerScores = element.PlayerScore.filter(e => e.player.playerId != newPlayerScore.player.playerId);
        playerScores.push(newPlayerScore);
        newGameState.push({name: element.name, PlayerScore: playerScores})
    });
    return newGameState;
}