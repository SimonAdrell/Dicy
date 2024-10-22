import {StyleSheet} from 'react-native';

const sharedStyle = StyleSheet.create({
  darkFontColor: {
    color: '#005b4f',
  },
  lightFontColor: {
    color: '#00aa98',
  },
  containerBackground: {
    backgroundColor: '#6db8ae',
  },
  itemBackground: {
    backgroundColor: '#e8fefa',
  },
});

const modalStyle = StyleSheet.create({
  modal: {
    fontSize: 28,
    alignItems: 'center',
    lineHeight: 32,
    marginTop: -6,
    padding: 10,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 32,
    width: 300,
    borderColor: '#6750A4',
    marginTop: 40,
    borderRadius: 6,
    borderWidth: 2,
    paddingLeft: 10,
  },
  centeredView: {
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tinyModalText: {
    marginBottom: 15,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,
  },
  formView: {
    alignItems: 'center',
  },
  saveView: {
    alignItems: 'center',
    zIndex: 10,
  },
  saveText: {
    marginTop: 40,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFC700',
  },
  playerRow: {
    width: 300,
    flexDirection: 'row',
  },
  lottie: {
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

export {sharedStyle, modalStyle};
