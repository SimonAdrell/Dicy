
import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import PlayerPicker from './src/library/components/players/playerPicker';
import { NavigationContainer } from '@react-navigation/native';
import MaxiYatzy from './src/screens/maxiYatzy/maxiYatzyScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameProvider } from './src/Helpers/Game/gameContext';
import GamePicker from './src/screens/game/gamePicker';

export type RootStackParamList = {
  GamePicker: undefined;
  PlayerPicker: undefined;
  MaxiYatzy: undefined;
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
          <RootStack.Screen name="MaxiYatzy" component={MaxiYatzy} options={{
            headerShown: false,
          }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GameProvider>

  );
}

export default App;
