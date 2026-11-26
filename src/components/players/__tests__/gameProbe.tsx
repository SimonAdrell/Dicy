import {useGame} from '@helpers/Game/gameContext';
import {Game} from '@helpers/Game/Game';

/** Test helper: exposes the current game from the surrounding GameProvider. */
export function createGameProbe() {
  let current: Game | undefined;
  const Probe = () => {
    current = useGame().game;
    return null;
  };
  return {
    Probe,
    players: () => current?.players ?? [],
    playerIds: () => (current?.players ?? []).map(p => p.playerId),
  };
}
