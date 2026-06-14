import {StyleSheet} from 'react-native';

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
      color: isDarkMode ? '#e8fefa' : '#063b35',
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
      // backgroundColor: isDarkMode ? '#5f5f5f' : '#F7F7F7',
      backgroundColor: isDarkMode ? '#214540' : '#6db8ae',
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
      color: isDarkMode ? '#e8fefa' : '#063b35',
    },
    formView: {
      alignItems: 'center',
    },
    saveView: {
      alignItems: 'center',
      zIndex: 10,
      marginTop: 20,
    },
    playerRow: {
      width: 300,
      flexDirection: 'row',
      borderRadius: 10,
      marginBottom: 10,
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
      color: isDarkMode ? '#7dc1b7' : SharedStyle(isDarkMode).fontColor.color,
    },
    lowerView: {
      marginTop: 30,
      padding: 20,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
    },
  });

const SharedStyle = (isDarkMode: boolean) =>
  StyleSheet.create({
    // Text on light "card" surfaces (item backgrounds, winner row, yatzy cards).
    // These surfaces stay light in both schemes, so the colour does not vary by
    // mode. Darkened from #005b4f so normal-size text clears AA (4.5:1) even on
    // the lightest dark-mode card (#7dc1b7 -> 6.04:1).
    fontColor: {
      color: '#063b35',
    },
    secondaryFontColor: {
      color: '#063b35',
    },
    // Text drawn directly on the screen/modal container background. The container
    // is dark teal (#214540) in dark mode and medium teal (#6db8ae) in light mode,
    // so the readable colour must flip with the scheme to keep AA contrast.
    onContainer: {
      color: isDarkMode ? '#e8fefa' : '#063b35',
    },
    // Muted variant for subtitles/section labels on the container. Still AA at
    // normal size: light mode reuses #063b35 (5.41:1) because the medium-teal
    // container is too light for a lighter tone to pass.
    onContainerMuted: {
      color: isDarkMode ? '#cdeae5' : '#063b35',
    },
    containerBackground: {
      backgroundColor: isDarkMode ? '#214540' : '#6db8ae',
    },
    itemBackground: {
      backgroundColor: isDarkMode ? '#7dc1b7' : '#e8fefa',
    },
    itemSelected: {
      backgroundColor: isDarkMode ? '#a5d4cd' : '#e8fefa',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.28,
      shadowRadius: 16.41,
      elevation: 70,
      opacity: 1,
    },
  });

export {SharedStyle, modalStyle};
