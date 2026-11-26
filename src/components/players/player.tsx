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
import {useGame} from '@helpers/Game/gameContext';
import {
  removePlayerFromGame,
  togglePlayerInGame,
} from '@helpers/Player/PlayerHelper';
import {useState} from 'react';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {useTranslation} from 'react-i18next';
import {SharedStyle} from '@styles/sharedStyle';
type PlayerProps = Readonly<
  ViewProps & {
    playerDto: PlayerDto;
  }
>;

export default function Player(props: PlayerProps) {
  const playerHandler = playerStorageHandler();
  const {t} = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const {game, setGame} = useGame();
  // Selection and order come from the game, so they cannot drift from it.
  const playerInGame = game?.players?.find(
    p => p.playerId === props.playerDto.playerId,
  );
  const playerIsActiveGaming = playerInGame !== undefined;
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);

  const togglePlayerToGame = () => {
    setGame(togglePlayerInGame(game, props.playerDto, t));
  };

  const deletePlayer = () => {
    const players = playerHandler
      .getPlayers()
      .filter(p => p.playerId !== props.playerDto.playerId);
    setConfirmDialogVisible(false);
    // Drop the player from the game too, or they keep a column on the sheet.
    setGame(removePlayerFromGame(game, props.playerDto.playerId, t));
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
        {playerInGame?.order !== undefined && (
          <View style={styles.orderBadge}>
            <Text style={styles.orderBadgeText}>{playerInGame.order + 1}</Text>
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
