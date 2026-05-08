import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 10,
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 12,
    width: '100%',
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  gameHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#063b35',
  },
  gameHeaderSubtitle: {
    fontSize: 13,
    color: '#0a4a44',
    marginTop: 1,
  },
  playersWrapper: {
    flex: 6,
  },
});
