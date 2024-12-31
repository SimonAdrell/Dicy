import { StyleSheet } from 'react-native';

const yatzyStyle = StyleSheet.create({
  row: { height: 28, flex: 1, flexBasis: 1, flexDirection: 'row' },
  head: { height: 48, flex: 1, color: '#000', padding: 5 },
  text: { textAlign: 'center', flex: 1 },
  cell: { textAlign: 'center', flex: 1, borderLeftWidth: 1 },
  done: { fontWeight: 'bold', backgroundColor: '#CCD5AE' },
});

export { yatzyStyle };
