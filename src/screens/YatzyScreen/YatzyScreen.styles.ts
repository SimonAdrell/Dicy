import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, paddingTop: 20, padding: 10},
  title: {flex: 1, textAlign: 'center', alignItems: 'center'},
  player: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  playerName: {fontSize: 11, fontWeight: '600', marginTop: 4},
  scoreChip: {
    marginTop: 2,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  scoreChipLeader: {
    backgroundColor: '#FFC700',
  },
  scoreChipText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0a3a35',
  },
  scoreChipTextLeader: {
    color: '#063b35',
  },
  row: {height: 28, flex: 1},
  headerRow: {flexDirection: 'row', paddingBottom: 8},
  board: {width: '100%'},
  doneCell1: {backgroundColor: '#CCD5AE'},
  doneCell2: {backgroundColor: '#E9EDC9'},
  removedCell1: {backgroundColor: '#ededed'},
  removedCell2: {backgroundColor: '#d3d3d3'},
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,91,79,0.06)',
  },
  sectionLabelText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#063b35',
  },
  sectionLabelHint: {
    fontSize: 10,
    color: '#0a3a35',
    opacity: 0.5,
    fontFamily: 'monospace',
  },
});
