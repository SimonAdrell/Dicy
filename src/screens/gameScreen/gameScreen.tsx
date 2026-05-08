import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import gameHelper from '@helpers/Game/gameHelper';
import {gameType} from '@helpers/Game/gameType';
import {useGame} from '@helpers/Game/gameContext';
import GameTypeItem from '@components/game/gameTypeItem';
import styles from './gameScreen.styles';
import {useTranslation} from 'react-i18next';
import SettingsIcon from '@components/settings/settingsIcon';
import {SharedStyle} from '@styles/sharedStyle';
import DieFace from '@components/shared/DieFace';

type Props = NativeStackScreenProps<RootStackParamList, 'GamePicker'>;

const GameScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {setGame} = useGame();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);

  const save = (type: gameType) => {
    const helper = gameHelper(undefined);
    helper.generateNewGame(type);
    setGame(helper.getGame());
    navigation.navigate('PlayerPicker');
  };

  return (
    <SafeAreaView style={[styles.container, sStyle.containerBackground]}>
      <View style={styles.wrapperContainer}>
        <View style={styles.languageContainer}>
          <SettingsIcon />
        </View>

        {/* Dicy branding header */}
        <View style={styles.brandingHeader}>
          <View style={styles.brandingRow}>
            <DieFace pips={5} size={42} tone="light" />
            <DieFace pips={3} size={42} tone="dark" />
            <Text style={styles.brandingTitle}>Dicy</Text>
          </View>
          <Text style={styles.brandingSubtitle}>
            No paper, no pen. Pick your variant, drop in your dice, keep score.
          </Text>
        </View>

        <View style={styles.playersWrapper}>
          <Text style={styles.sectionLabel}>Choose a game</Text>
          <ScrollView style={styles.gameTypesWrapper}>
            <GameTypeItem
              pips={6}
              categories={20}
              bonusLimit={75}
              onSelected={() => save(gameType.maxiYatzy)}
              gameName={t('gameType.maxiYatzy.name')}
              gameTagLine={t('gameType.maxiYatzy.tagLine')}
            />
            <GameTypeItem
              pips={5}
              categories={15}
              bonusLimit={63}
              onSelected={() => save(gameType.yatzy)}
              gameName={t('gameType.yatzy.name')}
              gameTagLine={t('gameType.yatzy.tagLine')}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;
