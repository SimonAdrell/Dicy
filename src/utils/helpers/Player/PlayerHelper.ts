import {PlayerDto} from '@components/players/playerObject';
import {PlayerScore} from '../Game/PlayerScore';
import playerStorageHandler from '@helpers/Storage/player/playerHandler';
import gameHelper from '@helpers/Game/gameHelper';
import {gameType} from '../Game/gameType';
import {TFunction} from 'i18next';
import {Game} from '../Game/Game';
import {Dispatch, SetStateAction} from 'react';

const sortPlayersByOrder = (a: PlayerDto, b: PlayerDto) => {
  const aOrder = a.order ?? Infinity;
  const bOrder = b.order ?? Infinity;
  return aOrder - bOrder;
};

const sortPlayerScoresByPlayersOrder = (a: PlayerScore, b: PlayerScore) => {
  const aOrder = a.player.order ?? Infinity;
  const bOrder = b.player.order ?? Infinity;
  return aOrder - bOrder;
};

const getPlayerId = (players: PlayerDto[]): number => {
  return players.reduce(
    (next, current) => Math.max(next, current.playerId + 1),
    0,
  );
};

const getNextOrder = (players: PlayerDto[]): number => {
  let highest = -1;
  players.forEach(p => {
    if (p.order !== undefined && p.order > highest) {
      highest = p.order;
    }
  });
  return highest + 1;
};

const playersInGame = (game: Game | undefined): PlayerDto[] =>
  [...(game?.players ?? [])].sort(sortPlayersByOrder);

/**
 * Returns a new game whose players are exactly `players`, in the given
 * order. The score sheet is rebuilt, so only use this before play starts.
 */
const withGamePlayers = (
  game: Game | undefined,
  players: PlayerDto[],
  t: TFunction<'translation', undefined>,
): Game => {
  const helper = gameHelper(game ? {...game} : undefined);
  if (!game) {
    helper.generateNewGame(gameType.maxiYatzy);
  }
  helper.setPlayers(
    // The sheet is rebuilt empty, so totals from an earlier sheet must go too.
    players.map((player, index) => ({
      ...player,
      order: index,
      currentScore: 0,
    })),
    t,
  );
  return helper.getGame();
};

const isPlayerInGame = (game: Game | undefined, playerId: number): boolean =>
  game?.players?.some(p => p.playerId === playerId) ?? false;

const removePlayerFromGame = (
  game: Game | undefined,
  playerId: number,
  t: TFunction<'translation', undefined>,
): Game | undefined => {
  if (!isPlayerInGame(game, playerId)) {
    return game;
  }
  return withGamePlayers(
    game,
    playersInGame(game).filter(p => p.playerId !== playerId),
    t,
  );
};

const togglePlayerInGame = (
  game: Game | undefined,
  player: PlayerDto,
  t: TFunction<'translation', undefined>,
): Game => {
  const without = playersInGame(game).filter(
    p => p.playerId !== player.playerId,
  );
  if (isPlayerInGame(game, player.playerId)) {
    return withGamePlayers(game, without, t);
  }
  return withGamePlayers(game, [...playersInGame(game), player], t);
};

const submitNewPlayer = (
  playerName: string,
  imageUrl: string,
  t: TFunction<'translation', undefined>,
  game: Game | undefined,
  setGame: Dispatch<SetStateAction<Game | undefined>>,
) => {
  const playerHandler = playerStorageHandler();
  const stored = playerHandler.getPlayers();
  const players: PlayerDto[] = Array.isArray(stored) ? [...stored] : [];
  const player: PlayerDto = {
    name: playerName,
    playerId: getPlayerId(players),
    imageUrl,
    plusImage: false,
    currentScore: 0,
    order: getNextOrder(players),
  };
  playerHandler.savePlayers([...players, player]);
  // Only the new player joins the game; the current selection is kept.
  setGame(withGamePlayers(game, [...playersInGame(game), player], t));
};

export {
  sortPlayerScoresByPlayersOrder,
  sortPlayersByOrder,
  getPlayerId,
  submitNewPlayer,
  isPlayerInGame,
  removePlayerFromGame,
  togglePlayerInGame,
  withGamePlayers,
};
