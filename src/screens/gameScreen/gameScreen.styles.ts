import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  languageContainer: {
    padding: 20,
    flex: 0,
    alignItems: 'flex-end',
  },
  brandingHeader: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandingTitle: {
    fontSize: 44,
    fontWeight: '700',
    color: '#063b35',
    letterSpacing: -1,
    marginLeft: 10,
  },
  brandingSubtitle: {
    fontSize: 15,
    color: '#0a4a44',
    lineHeight: 21,
    maxWidth: 280,
    marginTop: 6,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#063b35',
    opacity: 0.65,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    paddingLeft: 4,
  },
  playersWrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  gameTypesWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
});
