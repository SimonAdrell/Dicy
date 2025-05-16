import React, { useEffect } from 'react';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import PlayerScreen from './src/screens/playerScreen/PlayerScreen';
import { NavigationContainer } from '@react-navigation/native';
import YatzyScreen from './src/screens/YatzyScreen/YatzyScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameProvider } from './src/utils/helpers/Game/gameContext';
import GameScreen from './src/screens/gameScreen/gameScreen';
import { languageStorage } from '@helpers/Storage/language/languageStorage';
import { useTranslation } from 'react-i18next';

export type RootStackParamList = {
  GamePicker: undefined;
  PlayerPicker: undefined;
  Yatzy: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const storage: storage<string> = languageStorage('lang');
  const { t, i18n } = useTranslation();
  console.log("App language: ", i18n.language);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        storage.get().then((lang) => {
          if (lang) {
            i18n.changeLanguage(lang);
          }
        }).catch((e) => {
          console.log(e);
        })
      } catch (e) {
        console.log(e);
      }
    };
    loadLanguage();
  }, []);

  return (
    <GameProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="GamePicker">
          <RootStack.Screen
            name="GamePicker"
            component={GameScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="PlayerPicker"
            component={PlayerScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Yatzy"
            component={YatzyScreen}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

export default App;
