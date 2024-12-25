import { StyleSheet } from 'react-native';

const modalStyle = (isDarkMode: boolean) =>
  StyleSheet.create({
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
      borderColor: isDarkMode ? '#6750A4' : '#6750A4',
      marginTop: 40,
      borderRadius: 6,
      borderWidth: 2,
      paddingLeft: 10,
    },
    centeredView: {
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: isDarkMode ? '#454545' : '#F7F7F7',
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
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: 15,
      color: isDarkMode ? '#005b4f' : '#00aa98',
    },
    lowerView: {
      backgroundColor: '#F7F7F7',
      width: '100%',
      padding: 10,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
    },
  });

const SharedStyle = (isDarkMode: boolean) => StyleSheet.create({
  fontColor: {
    color: isDarkMode ? '#005b4f' : '#00aa98',
  },
  containerBackground: {
    backgroundColor: isDarkMode ? '#214540' : '#6db8ae',
  },
  itemBackground: {
    backgroundColor: isDarkMode ? '#03493d' : '#e8fefa',
  },
});


export { SharedStyle, modalStyle };
