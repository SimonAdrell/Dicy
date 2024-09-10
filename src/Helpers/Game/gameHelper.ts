import { PlayerDto } from "../../library/components/players/playerObject";
import { sortPlayersByOrder } from "../Player/PlayerHelper";
import { Game } from "./Game";
import { gameHelperType } from "./gameHelperType";
import { GameScore, lowerNames, middleNamesYatzy, middleNamesMaxiYatzy, upperNames } from "./GameScore";
import { GameState } from "./GameState";
import { gameType } from "./gameType";
import { PlayerScore } from "./PlayerScore";
import { playerTotalScore } from "./playerTotalScore";
import { scoreHandler } from "./scoreHandler";
import { state } from "./state";

const getBonusScore = (typeOfGame: gameType): number => {
    let bonusScore: number = 75;
    switch (typeOfGame) {
        case gameType.maxiYatzy:
            bonusScore = 100;
            break;
        case gameType.yatzy:
            bonusScore = 50;
            break;
        default:
            bonusScore = 75;
            break;
    }
    return bonusScore;
}

const getBonusLimit = (typeOfGame: gameType): number => {
    let bonusScore: number = 75;
    switch (typeOfGame) {
        case gameType.maxiYatzy:
            bonusScore = 75;
            break;
        case gameType.yatzy:
            bonusScore = 63;
            break;
        default:
            bonusScore = 75;
            break;
    }
    return bonusScore;
}

const generateGameState = (names: Array<GameScore>, players: Array<PlayerDto>): Array<GameState> => {
    var playerScores: Array<PlayerScore> = []
    players.sort(sortPlayersByOrder).forEach(element => {
        playerScores.push({
            player: element,
            isRemoved: false,
            score: undefined
        })
    });

    var gameStates: Array<GameState> = [];
    names.forEach(element => {
        gameStates.push({ score: element, PlayerScore: playerScores })
    });

    return gameStates;
}

const updatePlayersScore = (savedGame: Game, gameState: GameState[] | undefined, upperGameState: GameState[] | undefined) => {
    savedGame.players?.forEach(player => {
        var totalScore: number = 0;
        if (upperGameState) {
            var upperTotalScore: number = 0;
            upperGameState?.forEach(state => {
                upperTotalScore = upperTotalScore + state.PlayerScore
                    .filter(e => e.player.playerId == player.playerId && e.isRemoved == false)
                    .reduce((sum: number, current) => sum + (current.score ?? 0), 0);
            });
            upperTotalScore += (upperTotalScore >= savedGame.bonusLimit ? savedGame.bonusScore : 0);
            totalScore += upperTotalScore;
        }
        gameState?.forEach(state => {
            totalScore = totalScore + state.PlayerScore
                .filter(e => e.player.playerId == player.playerId && e.isRemoved == false)
                .reduce((sum: number, current) => sum + (current.score ?? 0), 0);
        });
        player.currentScore = totalScore;
    });
}

const updatePlayerScore = (savedGame: Game, scoreToBeUpdated: GameScore, newPlayerScore: PlayerScore) => {

    if (savedGame.upper?.some(g => g.score.name === scoreToBeUpdated.name)) {
        savedGame.upper = updateGameState(savedGame.upper, scoreToBeUpdated, newPlayerScore);
        return savedGame;
    }
    if (savedGame.middle?.some(g => g.score.name === scoreToBeUpdated.name)) {
        savedGame.middle = updateGameState(savedGame.middle, scoreToBeUpdated, newPlayerScore);
        return savedGame;
    }

    if (savedGame.lower?.some(g => g.score.name === scoreToBeUpdated.name)) {
        savedGame.lower = updateGameState(savedGame.lower, scoreToBeUpdated, newPlayerScore);
        return savedGame;
    }
}

const updateGameState = (gameState: Array<GameState>, scoreToBeUpdated: GameScore, newPlayerScore: PlayerScore): GameState[] => {
    var newGameState: GameState[] = [];
    gameState.forEach(element => {
        if (element.score.name != scoreToBeUpdated.name) {
            newGameState.push(element);
            return;
        }
        const matchesPlayerId = (playerScore: PlayerScore) => playerScore.player.playerId == newPlayerScore.player.playerId
        var indexOfMatchingScore = element.PlayerScore.findIndex(matchesPlayerId)
        if (indexOfMatchingScore == -1) {
            newGameState.push(element);
            return;
        }
        var playerScores = element.PlayerScore.filter(e => e.player.playerId != newPlayerScore.player.playerId);
        playerScores.push(newPlayerScore);
        newGameState.push({ score: element.score, PlayerScore: playerScores })
    });
    return newGameState;
}

const gameHelper = (game: Game | undefined): gameHelperType => {
    let savedGame: Game;
    if (game) {
        savedGame = game;
    }
    return {
        generateNewgame(typeOfGame: gameType) {
            savedGame = {
                gameType: typeOfGame,
                state: state.created,
                bonusScore: getBonusScore(typeOfGame),
                bonusLimit: getBonusLimit(typeOfGame)
            }
            return savedGame;
        },
        setPlayers(players: PlayerDto[]) {
            savedGame.upper = generateGameState(upperNames, players);
            savedGame.middle = generateGameState(savedGame.gameType === gameType.yatzy ? middleNamesYatzy : middleNamesMaxiYatzy, players);
            savedGame.lower = generateGameState(lowerNames, players);
            savedGame.players = players;
            savedGame.state = state.readyForGame;
        },
        getPlayers(): PlayerDto[] | undefined {
            return savedGame.players;
        },
        getGame: () => {
            return savedGame;
        },
        scoreHandler: (): scoreHandler => {
            return {
                updatePlayerScore: (scoreToBeUpdated: GameScore, newPlayerScore: PlayerScore) => {
                    if (savedGame.middle === undefined)
                        throw new Error("Game not set up correctly");
                    if (savedGame.lower === undefined)
                        throw new Error("Game not set up correctly");
                    if (savedGame.upper === undefined)
                        throw new Error("Game not set up correctly");

                    updatePlayerScore(savedGame, scoreToBeUpdated, newPlayerScore);
                    var scores: GameState[] = [...savedGame.middle, ...savedGame.lower];
                    updatePlayersScore(savedGame, scores, savedGame.upper);
                    return savedGame;
                },
                getPlayersUpperScore: (): Array<playerTotalScore> => {
                    if (savedGame.upper === undefined)
                        throw new Error("Game not set up correctly");

                    var playerSumArray: playerTotalScore[] = [];

                    savedGame.players?.forEach(player => {
                        var totalScore: number = 0;
                        var upperTotalScore: number = 0;
                        savedGame.upper?.forEach(state => {
                            upperTotalScore = upperTotalScore + state.PlayerScore
                                .filter(e => e.player.playerId == player.playerId && e.isRemoved == false)
                                .reduce((sum: number, current) => sum + (current.score ?? 0), 0);
                        });
                        totalScore += upperTotalScore;
                        playerSumArray.push({
                            player: player,
                            score: totalScore
                        })
                    });
                    return playerSumArray;
                }
            }
        },

    }
}

export default gameHelper;
