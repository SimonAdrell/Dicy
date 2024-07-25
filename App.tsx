
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

export type RootStackParamList = {
  PlayerPicker: undefined;
  MaxiYatzy: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="PlayerPicker" >
        <RootStack.Screen name="PlayerPicker" component={PlayerPicker} options={{
          headerShown: false,
        }} />
        <RootStack.Screen name="MaxiYatzy" component={MaxiYatzy} options={{
          headerShown: false,
        }} />
      </RootStack.Navigator>
    </NavigationContainer>

  );
}

export default App;
