import { StyleSheet, Text, useColorScheme, View, ViewProps } from 'react-native';
import { PlayerDto } from '../players/playerObject';
import { Avatar } from '../players/PlayerAvatar';
import { SharedStyle } from '@styles/sharedStyle';

interface ScoreModalPlayerProps extends ViewProps {
  readonly player: PlayerDto;
  readonly place: number;
}

export function ScoreModalPlayer(options: ScoreModalPlayerProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);
  return (
    <View {...options}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Text style={[styles.scoreText, sStyle.fontColor]}>{options.place}.</Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Avatar src={options.player.imageUrl} imageHeight={65}></Avatar>
      </View>
      <View style={{ flex: 5, padding: 20 }}>
        <Text style={[styles.gameNameText, sStyle.fontColor]}>{options.player.currentScore}</Text>
        <Text style={[sStyle.secondaryFontColor]}>{options.player.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 32,
  },
});
