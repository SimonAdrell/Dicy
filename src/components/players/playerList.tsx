import { FlatList, StyleSheet, useColorScheme } from 'react-native';
import { PlayerDto } from './playerObject';
import Player from './player';
import { gameHelperType } from '@helpers/Game/gameHelperType';
import AddNewPlayer from './addPlayer';
import { SharedStyle } from '@styles/sharedStyle';

type playerListProps = {
  players: PlayerDto[];
  gamingHelper: gameHelperType;
};

const PlayerList = ({ players, gamingHelper }: playerListProps) => {
  if (players.length == 0) {
    players.push({
      name: '',
      imageUrl: '',
      playerId: 0,
      plusImage: true,
      currentScore: 0,
      order: undefined,
    });
  }
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);
  return (
    <FlatList
      key={2}
      data={players}
      style={styles.container}
      numColumns={2}
      renderItem={item => {
        return item.item.plusImage ? (
          <AddNewPlayer />
        ) : (
          <Player
            playerDto={item.item}
            gamingHelper={gamingHelper}
            style={[styles.item, sStyle.itemBackground]}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 120,
    width: 90,
    borderStyle: 'solid',
    padding: 15,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 20,
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    padding: 20,
  },
});

export default PlayerList;
