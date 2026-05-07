import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DieFace from '@components/shared/DieFace';

type gameTypeItems = Readonly<{
  gameName: string;
  gameTagLine: string;
  pips: number;
  categories: number;
  bonusLimit: number;
  onSelected: () => void;
}>;

export default function GameTypeItem({
  onSelected,
  gameName,
  gameTagLine,
  pips,
  categories,
  bonusLimit,
}: gameTypeItems) {
  return (
    <TouchableOpacity style={styles.card} onPress={onSelected} activeOpacity={0.82}>
      <View style={styles.topRow}>
        <DieFace pips={pips} size={48} tone="light" />
        <View style={styles.textBlock}>
          <Text style={styles.gameNameText}>{gameName}</Text>
          <Text style={styles.gameTagText}>{gameTagLine}</Text>
        </View>
        <View style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statText}>
          <Text style={styles.statBold}>{categories}</Text>
          {' categories'}
        </Text>
        <Text style={styles.statText}>
          {'Bonus at '}
          <Text style={styles.statBold}>{bonusLimit}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e8fefa',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  gameNameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#063b35',
    letterSpacing: -0.3,
  },
  gameTagText: {
    fontSize: 14,
    color: '#3d6e68',
    marginTop: 2,
  },
  chevron: {
    paddingLeft: 4,
  },
  chevronText: {
    fontSize: 28,
    color: '#063b35',
    lineHeight: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,91,79,0.18)',
    borderStyle: 'dashed',
  },
  statText: {
    fontSize: 12,
    color: '#3d6e68',
    fontWeight: '500',
  },
  statBold: {
    color: '#063b35',
    fontWeight: '700',
  },
});
