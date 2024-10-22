import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {SafeAreaView, View, ScrollView, TouchableOpacity} from 'react-native';
import gameHelper from '@helpers/Game/gameHelper';
import {gameType} from '@helpers/Game/gameType';
import {useGame} from '@helpers/Game/gameContext';
import GameTypeItem from '@components/game/gameTypeItem';
import styles from './gameScreen.styles';
import {useTranslation} from 'react-i18next';
import SettingsIcon from '@components/settings/settingsIcon';
type Props = NativeStackScreenProps<RootStackParamList, 'GamePicker'>;

const GameScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {setGame} = useGame();

  const save = (gameType: gameType) => {
    const helper = gameHelper(undefined);
    helper.generateNewGame(gameType);
    setGame(helper.getGame());
    navigation.navigate('PlayerPicker');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContainer}>
        <View style={styles.languageContainer}>
          <SettingsIcon />
        </View>
        <View style={styles.playersWrapper}>
          <ScrollView style={styles.gameTypesWrapper}>
            <GameTypeItem
              IconName="dice-6"
              onSelected={() => save(gameType.maxiYatzy)}
              gameName={t('gameType.maxiYatzy.name')}
              gameTagLine={t('gameType.maxiYatzy.tagLine')}></GameTypeItem>
            <GameTypeItem
              IconName="dice-5"
              onSelected={() => save(gameType.yatzy)}
              gameName={t('gameType.yatzy.name')}
              gameTagLine={t('gameType.yatzy.tagLine')}></GameTypeItem>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;
