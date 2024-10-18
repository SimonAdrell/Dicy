import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import gameHelper from '@helpers/Game/gameHelper';
import {gameType} from '@helpers/Game/gameType';
import {useGame} from '@helpers/Game/gameContext';
import GameTypeItem from '@components/game/gameTypeItem';
import styles from './gameScreen.styles';
import {useTranslation} from 'react-i18next';
import {languageStorage} from '@helpers/Storage/language/languageStorage';
import {SeFlag, UkFlag} from '@components/shared/Flag';
type Props = NativeStackScreenProps<RootStackParamList, 'GamePicker'>;

const GameScreen = ({navigation}: Props) => {
  const {t, i18n} = useTranslation();

  const {setGame} = useGame();
  const save = (gameType: gameType) => {
    const helper = gameHelper(undefined);
    helper.generateNewGame(gameType);
    setGame(helper.getGame());
    navigation.navigate('PlayerPicker');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const storage: itemStorage<string> = languageStorage('lang');
    storage.save(lng);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContainer}>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            onPress={() => changeLanguage('en')}
            style={{
              opacity: i18n.resolvedLanguage === 'en' ? 0 : 1,
            }}>
            <UkFlag
              height={i18n.resolvedLanguage === 'en' ? 0 : 40}
              width={40}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeLanguage('se')}
            style={{
              opacity: i18n.resolvedLanguage === 'se' ? 0 : 1,
            }}>
            <SeFlag
              height={i18n.resolvedLanguage === 'se' ? 0 : 40}
              width={40}
            />
          </TouchableOpacity>
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
