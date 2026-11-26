import {FlatList, StyleSheet, useColorScheme} from 'react-native';
import {PlayerDto} from './playerObject';
import Player from './player';
import AddNewPlayer from './addPlayer';
import {SharedStyle} from '@styles/sharedStyle';

type playerListProps = {
  players: PlayerDto[];
};

const PlayerList = ({players}: playerListProps) => {
  // With no saved players, show a single "add player" card instead.
  const data: PlayerDto[] =
    players.length === 0
      ? [
          {
            name: '',
            imageUrl: '',
            playerId: 0,
            plusImage: true,
            currentScore: 0,
            order: undefined,
          },
        ]
      : players;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);
  return (
    <FlatList
      key={2}
      data={data}
      style={styles.container}
      numColumns={2}
      keyExtractor={item =>
        item.plusImage ? 'add-player' : String(item.playerId)
      }
      renderItem={item => {
        return item.item.plusImage ? (
          <AddNewPlayer />
        ) : (
          <Player
            playerDto={item.item}
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
