import { StyleSheet } from 'react-native';

const modalStyle = (isDarkMode: boolean) =>
  StyleSheet.create({
    modal: {
      fontSize: 28,
      lineHeight: 32,
      marginTop: -6,
      padding: 10,
    },
    textInput: {
      fontSize: 14,
      lineHeight: 32,
      width: 270,
      borderColor: isDarkMode ? '#c4a32b' : '#FFC700',
      // marginTop: 20,
      marginBottom: 20,
      borderRadius: 6,
      borderWidth: 2,
      paddingLeft: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      width: 300,
    },
    modalView: {
      backgroundColor: isDarkMode ? '#5f5f5f' : '#F7F7F7',
      margin: 20,
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    tinyModalText: {
      marginBottom: 15,
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 14,
    },
    formView: {
      alignItems: 'center'
    },
    saveView: {
      alignItems: 'center',
      zIndex: 10,
      marginTop: 20,
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
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      alignItems: 'center',
      fontSize: 28,
      color: SharedStyle(isDarkMode).fontColor.color,
    },
    lowerView: {
      marginTop: 30,
      padding: 20,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
    },
  });

const SharedStyle = (isDarkMode: boolean) => StyleSheet.create({
  fontColor: {
    color: isDarkMode ? '#e8fefa' : '#005b4f',
  },
  secondaryFontColor: {
    color: isDarkMode ? '#84afaa' : '#005b4f',
  },
  containerBackground: {
    backgroundColor: isDarkMode ? '#214540' : '#6db8ae',
  },
  itemBackground: {
    backgroundColor: isDarkMode ? '#005b4f' : '#e8fefa',
  },
});


export { SharedStyle, modalStyle };
