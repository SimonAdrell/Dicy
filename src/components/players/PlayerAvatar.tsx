import React from 'react';
import {
  Image,
  ImageProps as DefaultImageProps,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {takenImage} from '../../utils/helpers/Image/takenImage';
import takePicture from '../../utils/helpers/Image/ImageTaker';

type ImageProps = DefaultImageProps & {
  source?: ImageURISource;
};

interface AvatarProps extends ImageProps {
  onChange?: (image: takenImage) => void;
  imageHeight?: number;
}

export const AvatarCreation = (props: AvatarProps) => {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const imageTaken = (image: takenImage) => {
    setUri(image.path);
    props.onChange?.(image);
  };

  const pickPicture = () => {
    takePicture({
      onImageTaken: imageTaken,
    });
  };

  return (
    <TouchableOpacity onPress={pickPicture}>
      {uri ? (
        <Image
          style={[styles(isDarkMode).avatar, styles(isDarkMode).bigAvatar]}
          {...props}
          source={uri ? {uri} : props.source}
        />
      ) : (
        <Icon
          name="emoticon-outline"
          style={[styles(isDarkMode).avatar, styles(isDarkMode).bigAvatar]}
        />
      )}
    </TouchableOpacity>
  );
};

export const Avatar = (props: AvatarProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View>
      {props.src ? (
        <Image
          style={[
            styles(isDarkMode).miniAvatar,
            styles(isDarkMode).avatar,
            {height: props.imageHeight, width: props.imageHeight},
          ]}
          {...props}
          source={props.source}
        />
      ) : (
        <Icon
          name="emoticon-outline"
          style={[
            styles(isDarkMode).miniAvatar,
            styles(isDarkMode).avatar,
            {
              fontSize: props.imageHeight,
              height: props.imageHeight,
              width: props.imageHeight,
            },
            props.style,
          ]}
        />
      )}
    </View>
  );
};

export const NewPlayerAvatar = (props: AvatarProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View>
      {props.src ? (
        <Image
          style={[
            styles(isDarkMode).miniAvatar,
            styles(isDarkMode).avatar,
            {height: props.imageHeight, width: props.imageHeight},
          ]}
          {...props}
          source={props.source}
        />
      ) : (
        <Icon
          name="plus"
          style={[
            styles(isDarkMode).miniAvatar,
            styles(isDarkMode).avatar,
            {
              fontSize: props.imageHeight,
              height: props.imageHeight,
              width: props.imageHeight,
              fontWeight: 'light',
            },
            props.style,
            // The "add player" avatar is always placed on the light itemBackground
            // (overridden via props.style), so the glyph must be dark in both modes.
            {color: '#063b35'},
          ]}
        />
      )}
    </View>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    avatar: {
      backgroundColor: isDarkMode ? '#363636' : '#E8E8E8',
      borderRadius: 1000,
      borderColor: '#FFC700',
      borderStyle: 'solid',
      alignItems: 'center',
      justifyContent: 'center',
      color: isDarkMode ? '#e8fefa' : '#063b35',
    },
    miniAvatar: {
      width: 20,
      height: 20,
    },
    bigAvatar: {
      width: 80,
      height: 80,
      fontSize: 80,
    },
  });
