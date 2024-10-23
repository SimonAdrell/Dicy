import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
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

  return <GameContext.Provider {...props} value={{game, setGame}} />;
};

export {GameProvider, useGame};
