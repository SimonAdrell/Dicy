import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Game} from './Game';

type GameContextType = {
  game: Game | undefined;
  setGame: Dispatch<SetStateAction<Game | undefined>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within an GameProvider');
  }
  return context;
}

const GameProvider = (props: {children: ReactNode}): ReactElement => {
  const [game, setGame] = useState<Game | undefined>(undefined);
  const value = useMemo(() => ({game, setGame}), [game]);

  return <GameContext.Provider {...props} value={value} />;
};

export {GameProvider, useGame};
