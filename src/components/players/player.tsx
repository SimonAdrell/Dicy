import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewProps,
  useColorScheme,
} from 'react-native';
import { PlayerDto } from './playerObject';
import { Avatar } from './PlayerAvatar';
import playerStorageHandler from '@helpers/Storage/player/playerHandler';
import { gameHelperType } from '@helpers/Game/gameHelperType';
import { gameType } from '@helpers/Game/gameType';
import { useState } from 'react';
import ConfirmDialog from 'react-native-simple-dialogs/dist/ConfirmDialog';
import { useTranslation } from 'react-i18next';
interface playerProps extends ViewProps {
  playerDto: PlayerDto;
  gamingHelper: gameHelperType;
}

export default function Player(props: playerProps) {
  const playerHandler = playerStorageHandler();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const playerIsGaming = (): boolean => {
    let players = props.gamingHelper.getPlayers();
    if (players) {
      return (
        players.filter(e => e.playerId === props.playerDto.playerId).length > 0
      );
    }
    return false;
  };

  const [playerIsActiveGaming, setPlayersIsGaming] =
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
    setPlayersIsGaming(false);
  };

  const addPlayerToGame = () => {
    let players = props.gamingHelper.getPlayers();
    if (players) {
      players?.push(props.playerDto);
      const playerWithHighestOrder = players.reduce((prev, current) => {
        const aOrder = prev.order !== undefined ? prev.order : Infinity;
        const bOrder = current.order !== undefined ? current.order : Infinity;
        return aOrder < bOrder ? prev : current;
      });
      const currentHighestOrder =
        playerWithHighestOrder.order !== undefined
          ? playerWithHighestOrder.order
          : 0;
      props.playerDto.order = currentHighestOrder + 1;
      updatePlayers(players);
    } else {
      players = new Array<PlayerDto>();
      props.playerDto.order = 0;
      players.push(props.playerDto);
      updatePlayers(players);
    }
    setPlayersIsGaming(true);
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
    return;
  };

  const deletePlayer = () => {
    var players = playerHandler.getPlayers();
    const indexOfObject = players.findIndex(object => {
      return object.playerId === props.playerDto.playerId;
    });
    if (indexOfObject !== -1) {
      players.splice(indexOfObject, 1);
    }
    playerHandler.savePlayers(players);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        playerIsActiveGaming ? styles.containerShadow : { shadowColor: '#000' },
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
        style={{ flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <View style={{ flex: 1, alignContent: 'center', marginLeft: 5 }}>
          <Avatar src={props.playerDto.imageUrl} imageHeight={65}></Avatar>
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View
            style={{
              flex: 1,
              padding: 5,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.sectionTitle,isDarkMode ? styles.sectionTitleDark : styles.sectionTitleLight]}>{props.playerDto.name}</Text>
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
    backgroundColor: '#e8fefa',
    padding: 15,
    paddingBottom: 20,
    margin: 5,
    borderRadius: 10,
    height: 130,
    opacity: 0.8,
  },
  containerShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16.41,
    elevation: 20,
    opacity: 1,
  },
  gameTypeActive: {
    flex: 1,
  },
  gameTypeItemWrapper: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 20,
  },
  gameNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005b4f',
  },
  gameTagLineText: {
    color: '#00aa98',
  },
  remove: {
    backgroundColor: '#ffa17a',
    borderRadius: 10,
    padding: 2,
    paddingLeft: 15,
    paddingRight: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005b4f',
  },
  sectionTitleDark: {
      color: '#00806f'
  },
  sectionTitleLight:{
      color: '#005b4f'
  },
});
