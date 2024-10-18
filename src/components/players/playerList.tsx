import {useState, useEffect} from 'react';
import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import {PlayerDto} from './playerObject';
import Player from './player';
import {gameHelperType} from '@helpers/Game/gameHelperType';

const minCols = 2;

const calcNumColumns = (width: number) => {
  const cols = width / styles.item.width;
  const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
  const colsMinusMargin = cols - 2 * colsFloor * styles.item.margin;
  if (colsMinusMargin < colsFloor && colsFloor > minCols) {
    return colsFloor - 1;
  } else return colsFloor;
};

const formatData = (data: PlayerDto[], numColumns: number) => {
  const amountFullRows = Math.floor(data.length / numColumns);
  let amountItemsLastRow = data.length - amountFullRows * numColumns;

  //   while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
  //     data.push({key: `empty-${amountItemsLastRow}`, empty: true});
  //     amountItemsLastRow++;
  //   }
  return data;
};

type playerListProps = {
  players: PlayerDto[];
  gamingHelper: gameHelperType;
};

const PlayerList = ({players, gamingHelper}: playerListProps) => {
  const {width} = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(calcNumColumns(width));

  useEffect(() => {
    setNumColumns(calcNumColumns(width));
  }, [width]);

  return (
    <FlatList
      key={2}
      data={formatData(players, numColumns)}
      style={styles.container}
      numColumns={2}
      renderItem={item => {
        return (
          <Player
            playerDto={item.item}
            gamingHelper={gamingHelper}
            style={styles.item}></Player>
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
    backgroundColor: '#e8fefa',
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
