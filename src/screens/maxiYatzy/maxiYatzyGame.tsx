import { PlayerDto } from "../../library/components/players/playerObject";

export interface PlayerScore {
    isRemoved?: boolean ;
    playerId: number;
    score: number | undefined;
}

export interface GameState {
    name: string;
    PlayerScore: PlayerScore[];
}

export interface Game {
    players: PlayerDto[];
    upper: GameState[];
    middle: GameState[];
    lower: GameState[];
};

const upperNames = ['Ettor', 'Tvåor', 'Treor', 'Fyror', 'Femmor', 'Sexor'];
const middleNames = ['1 par', '2 par', '3 par', 'Tretal', 'Fyrtal', 'Femtal', 'Liten stege', 'Stor stege', 'Full stege', 'Kåk', 'Hus', 'Torn', 'Chans'];
const lowerNames = ['Maxi Yatzy'];

function generateGameState(names: Array<string>, players: Array<PlayerDto>): Array<GameState> {
    var playerScores: Array<PlayerScore> = []
    players.forEach(element => {
        playerScores.push({
            playerId: element.playerId,
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
        const matchesPlayerId = (playerScore: PlayerScore) => playerScore.playerId == newPlayerScore.playerId
        var indexOfMatchingScore = element.PlayerScore.findIndex(matchesPlayerId)
        if(indexOfMatchingScore == -1){
            newGameState.push(element);
            return;
        }

        var playerScores = element.PlayerScore.filter(e => e.playerId != newPlayerScore.playerId);
        playerScores.push(newPlayerScore);
        newGameState.push({name: element.name, PlayerScore: playerScores})
    });
    return newGameState;   
}