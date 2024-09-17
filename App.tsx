
import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import PlayerPicker from './src/screens/playerScreen/PlayerScreen';
import { NavigationContainer } from '@react-navigation/native';
import YatzyScreen from './src/screens/YatzyScreen/YatzyScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameProvider } from './src/utils/helpers/Game/gameContext';
import GamePicker from './src/screens/game/gamePicker';

export type RootStackParamList = {
  GamePicker: undefined;
  PlayerPicker: undefined;
  Yatzy: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <GameProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="GamePicker" >
          <RootStack.Screen name="GamePicker" component={GamePicker} options={{
            headerShown: false,
          }} />
          <RootStack.Screen name="PlayerPicker" component={PlayerPicker} options={{
            headerShown: false,
          }} />
          <RootStack.Screen name="Yatzy" component={YatzyScreen} options={{
            headerShown: false,
          }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GameProvider>

  );
}

export default App;
