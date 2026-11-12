import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewProps,
  useColorScheme,
} from 'react-native';
import {PlayerDto} from './playerObject';
import {Avatar} from './PlayerAvatar';
import playerStorageHandler from '@helpers/Storage/player/playerHandler';
import {gameHelperType} from '@helpers/Game/gameHelperType';
import {gameType} from '@helpers/Game/gameType';
import {useState} from 'react';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {useTranslation} from 'react-i18next';
import {SharedStyle} from '@styles/sharedStyle';
type PlayerProps = Readonly<
  ViewProps & {
    playerDto: PlayerDto;
    gamingHelper: gameHelperType;
  }
>;

export default function Player(props: PlayerProps) {
  const playerHandler = playerStorageHandler();
  const {t} = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const playerIsGaming = (): boolean => {
    let players = props.gamingHelper.getPlayers();
    if (players) {
      return (
        players.some(e => e.playerId === props.playerDto.playerId)
      );
    }
    return false;
  };

  const [playerIsActiveGaming, setPlayerIsActiveGaming] =
    useState<boolean>(playerIsGaming());
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);
  const removePlayerFromGame = () => {
    let players = props.gamingHelper.getPlayers();
    if (players) {
      const indexOfObject = players.findIndex(object => {
        return object.playerId === props.playerDto.playerId;
      });
      if (indexOfObject !== -1) {
        players.splice(indexOfObject, 1);
      }
      props.playerDto.order = undefined;
      updatePlayers(players);
    }
    setPlayerIsActiveGaming(false);
  };

  const addPlayerToGame = () => {
    let players = props.gamingHelper.getPlayers();
    if (players) {
      players?.push(props.playerDto);
      const playerWithHighestOrder = players.reduce<PlayerDto | undefined>(
        (prev, current) =>
          (prev?.order ?? -Infinity) > (current.order ?? -Infinity)
            ? prev
            : current,
        undefined,
      );
      const currentHighestOrder = playerWithHighestOrder?.order ?? 0;
      props.playerDto.order = currentHighestOrder + 1;
      updatePlayers(players);
    } else {
      players = new Array<PlayerDto>();
      props.playerDto.order = 0;
      players.push(props.playerDto);
      updatePlayers(players);
    }
    setPlayerIsActiveGaming(true);
  };

  const updatePlayers = (players: PlayerDto[]) => {
    if (props.gamingHelper.getGame()) {
      props.gamingHelper.setPlayers(players, t);
    } else {
      props.gamingHelper.generateNewGame(gameType.maxiYatzy);
      props.gamingHelper.setPlayers(players, t);
    }
  };

  const togglePlayerToGame = () => {
    if (playerIsGaming()) {
      removePlayerFromGame();
      return;
    }
    addPlayerToGame();
  };

  const deletePlayer = () => {
    const players = playerHandler.getPlayers();
    const indexOfObject = players.findIndex(object => {
      return object.playerId === props.playerDto.playerId;
    });
    if (indexOfObject !== -1) {
      players.splice(indexOfObject, 1);
    }
    playerHandler.savePlayers(players);
  };

  const sStyle = SharedStyle(isDarkMode);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        sStyle.itemBackground,
        playerIsActiveGaming
          ? {...sStyle.itemSelected, borderColor: '#FFC700', borderWidth: 2}
          : {shadowColor: '#000', opacity: 0.7},
      ]}
      key={props.playerDto.playerId}
      onPress={() => {
        togglePlayerToGame();
      }}
      onLongPress={() => {
        setConfirmDialogVisible(true);
      }}>
      <View
        {...props}
        style={{flexDirection: 'column', alignItems: 'center', height: '100%'}}>
        {playerIsActiveGaming && props.playerDto.order !== undefined && (
          <View style={styles.orderBadge}>
            <Text style={styles.orderBadgeText}>
              {props.playerDto.order + 1}
            </Text>
          </View>
        )}
        <View style={{flex: 1, alignContent: 'center', marginLeft: 5}}>
          <Avatar src={props.playerDto.imageUrl} imageHeight={65} />
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              flex: 1,
              padding: 5,
              marginTop: 13,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.sectionTitle, sStyle.fontColor]}>
              {props.playerDto.name}
            </Text>
          </View>
        </View>
        <ConfirmDialog
          title={t('player.deletePlayerHeader')}
          message={t('player.message')}
          visible={confirmDialogVisible}
          onTouchOutside={() => {
            setConfirmDialogVisible(false);
          }}
          positiveButton={{
            title: t('player.positive'),
            onPress: () => deletePlayer(),
          }}
          negativeButton={{
            title: t('player.cancel'),
            onPress: () => setConfirmDialogVisible(false),
          }}
          onRequestClose={() => setConfirmDialogVisible(false)}
          contentInsetAdjustmentBehavior={undefined}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 20,
    margin: 5,
    borderRadius: 18,
    height: 130,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#063b35',
  },
  orderBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFC700',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  orderBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#063b35',
  },
});
