import {PlayerDto} from '@components/players/playerObject';
import {sortPlayersByOrder} from '../Player/PlayerHelper';
import {Game} from './Game';
import {gameHelperType} from './gameHelperType';
import {
  GameScore,
  lowerNames,
  middleNamesYatzy,
  middleNamesMaxiYatzy,
  upperNames,
} from './GameScore';
import {GameState} from './GameState';
import {gameType} from './gameType';
import {PlayerScore} from './PlayerScore';
import {playerTotalScore} from './playerTotalScore';
import {scoreHandler} from './scoreHandler';
import {state} from './state';
import {TFunction} from 'i18next';
import {
  bonusScoreKey,
  bonusScoreStorage,
} from '@helpers/Storage/bonus/bonusScoreStorage';

const DEFAULT_BONUS_SCORE = 50;

const getBonusScore = (typeOfGame: gameType): number => {
  const stored = bonusScoreStorage(bonusScoreKey(typeOfGame)).get();
  return stored ?? DEFAULT_BONUS_SCORE;
};

const getBonusLimit = (typeOfGame: gameType): number => {
  switch (typeOfGame) {
    case gameType.maxiYatzy:
      return 75;
    case gameType.yatzy:
      return 63;
    default:
      return 75;
  }
};

const generateGameState = (
  names: Array<GameScore>,
  players: Array<PlayerDto>,
): Array<GameState> => {
  const playerScores: Array<PlayerScore> = [];
  [...players].sort(sortPlayersByOrder).forEach(element => {
    playerScores.push({
      player: element,
      isRemoved: false,
      score: undefined,
    });
  });

  const gameStates: Array<GameState> = [];
  names.forEach(element => {
    gameStates.push({score: element, PlayerScore: [...playerScores]});
  });

  return gameStates;
};

const updatePlayersScore = (
  savedGame: Game,
  gameState: GameState[] | undefined,
  upperGameState: GameState[] | undefined,
) => {
  savedGame.players?.forEach(player => {
    let totalScore: number = 0;
    if (upperGameState) {
      let upperTotalScore: number = 0;
      upperGameState?.forEach(s => {
        upperTotalScore =
          upperTotalScore +
          s.PlayerScore.filter(
            e => e.player.playerId == player.playerId && e.isRemoved == false,
          ).reduce((sum: number, current) => sum + (current.score ?? 0), 0);
      });
      upperTotalScore +=
        upperTotalScore >= savedGame.bonusLimit ? savedGame.bonusScore : 0;
      totalScore += upperTotalScore;
    }
    gameState?.forEach(s => {
      totalScore =
        totalScore +
        s.PlayerScore.filter(
          e => e.player.playerId == player.playerId && e.isRemoved == false,
        ).reduce((sum: number, current) => sum + (current.score ?? 0), 0);
    });
    player.currentScore = totalScore;
  });
};

const updatePlayerScore = (
  savedGame: Game,
  scoreToBeUpdated: GameScore,
  newPlayerScore: PlayerScore,
) => {
  if (savedGame.upper?.some(g => g.score.name === scoreToBeUpdated.name)) {
    savedGame.upper = updateGameState(
      savedGame.upper,
      scoreToBeUpdated,
      newPlayerScore,
    );
    return savedGame;
  }
  if (savedGame.middle?.some(g => g.score.name === scoreToBeUpdated.name)) {
    savedGame.middle = updateGameState(
      savedGame.middle,
      scoreToBeUpdated,
      newPlayerScore,
    );
    return savedGame;
  }

  if (savedGame.lower?.some(g => g.score.name === scoreToBeUpdated.name)) {
    savedGame.lower = updateGameState(
      savedGame.lower,
      scoreToBeUpdated,
      newPlayerScore,
    );
    return savedGame;
  }
};

const updateGameState = (
  gameState: Array<GameState>,
  scoreToBeUpdated: GameScore,
  newPlayerScore: PlayerScore,
): GameState[] => {
  const newGameState: GameState[] = [];
  gameState.forEach(element => {
    if (element.score.name != scoreToBeUpdated.name) {
      newGameState.push(element);
      return;
    }
    const matchesPlayerId = (playerScore: PlayerScore) =>
      playerScore.player.playerId == newPlayerScore.player.playerId;
    if (!element.PlayerScore.some(matchesPlayerId)) {
      newGameState.push(element);
      return;
    }
    // Replace the matching player's score in place so the column order
    // (and therefore which player each rendered cell belongs to) is preserved.
    const playerScores = element.PlayerScore.map(ps =>
      matchesPlayerId(ps) ? newPlayerScore : ps,
    );
    newGameState.push({score: element.score, PlayerScore: playerScores});
  });
  return newGameState;
};

const gameHelper = (game: Game | undefined): gameHelperType => {
  let savedGame: Game;
  if (game) {
    savedGame = game;
  }
  return {
    generateNewGame(typeOfGame: gameType) {
      savedGame = {
        gameType: typeOfGame,
        state: state.created,
        bonusScore: getBonusScore(typeOfGame),
        bonusLimit: getBonusLimit(typeOfGame),
      };
      return savedGame;
    },
    setPlayers(players: PlayerDto[], t: TFunction<'translation', undefined>) {
      savedGame.upper = generateGameState(upperNames(t), players);
      savedGame.middle = generateGameState(
        savedGame.gameType === gameType.yatzy
          ? middleNamesYatzy(t)
          : middleNamesMaxiYatzy(t),
        players,
      );
      savedGame.lower = generateGameState(lowerNames(t), players);
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
        updatePlayerScore: (
          scoreToBeUpdated: GameScore,
          newPlayerScore: PlayerScore,
        ) => {
          if (savedGame.middle === undefined) {
            throw new Error('Game not set up correctly');
          }
          if (savedGame.lower === undefined) {
            throw new Error('Game not set up correctly');
          }
          if (savedGame.upper === undefined) {
            throw new Error('Game not set up correctly');
          }

          updatePlayerScore(savedGame, scoreToBeUpdated, newPlayerScore);
          const scores: GameState[] = [...savedGame.middle, ...savedGame.lower];
          updatePlayersScore(savedGame, scores, savedGame.upper);
          return savedGame;
        },
        getPlayersUpperScore: (): Array<playerTotalScore> => {
          if (savedGame.upper === undefined) {
            throw new Error('Game not set up correctly');
          }

          const playerSumArray: playerTotalScore[] = [];

          savedGame.players?.forEach(player => {
            let upperTotalScore: number = 0;
            savedGame.upper?.forEach(s => {
              upperTotalScore =
                upperTotalScore +
                s.PlayerScore.filter(
                  e =>
                    e.player.playerId == player.playerId &&
                    e.isRemoved == false,
                ).reduce(
                  (sum: number, current) => sum + (current.score ?? 0),
                  0,
                );
            });
            playerSumArray.push({
              player: player,
              score: upperTotalScore,
            });
          });
          return playerSumArray;
        },
      };
    },
  };
};

export default gameHelper;
