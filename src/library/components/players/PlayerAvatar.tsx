import React from 'react';
import {
    Image, ImageProps as DefaultImageProps,
    ImageURISource
    , StyleSheet, TouchableOpacity,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

type ImageProps = DefaultImageProps & {
    source?: ImageURISource;
};

interface AvatarProps extends ImageProps {
    onChange?: (image: ImageOrVideo) => void;
    imageHeight?: number;
}

export const AvatarCreation = (props: AvatarProps) => {
    const [uri, setUri] = React.useState(props.source?.uri || undefined);

    const pickPicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setUri(image.path);
            props.onChange?.(image);
        })
    };

    return (
        <TouchableOpacity onPress={pickPicture}>
            {uri ?
                <Image
                    style={styles.avatar}
                    {...props}
                    source={uri ? { uri } : props.source}
                />
                :
                <Icon name='face-man' style={styles.avatar}></Icon>
            }

        </TouchableOpacity>
    );
};

export const Avatar = (props: AvatarProps) => {
    return (
        <View>
            {props.src ?
            <Image
            style={[styles.miniAvatar, { height: props.imageHeight, width: props.imageHeight }]}
            {...props}
            source={props.source}
        />:
                <Icon name='face-man' style={[styles.miniAvatar, { fontSize: props.imageHeight, height: props.imageHeight, width: props.imageHeight },props.style]} ></Icon> 
            }
        </View>

    );
};

export const NewPlayerAvatar = (props: AvatarProps) => {
    return (
        <View>
            {props.src ?
            <Image
            style={[styles.miniAvatar, { height: props.imageHeight, width: props.imageHeight }]}
            {...props}
            source={props.source}
        />:
                <Icon name='plus' style={[styles.miniAvatar, { fontSize: props.imageHeight, height: props.imageHeight, width: props.imageHeight, fontWeight:'light' },props.style]} ></Icon> 
            }
        </View>

    );
};
const styles = StyleSheet.create({
    avatar: {
        width: 80,
        height: 80,
        fontSize: 80,
        backgroundColor: "#E8E8E8",
        borderRadius: 1000, // High value
        borderColor: '#FFC700',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    miniAvatar: {
        width: 20,
        height: 20,
        backgroundColor: "#E8E8E8",
        borderRadius: 1000, // High value
        borderColor: '#FFC700',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});