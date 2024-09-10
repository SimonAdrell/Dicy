import React from 'react';
import {
    Image, ImageProps as DefaultImageProps,
    ImageURISource
    , StyleSheet, TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { sharedStyle } from '../../style/sharedStyle';
import { takenImage } from '../../../Helpers/Image/takenImage';
import takePicture from '../../../Helpers/Image/ImageTaker';

type ImageProps = DefaultImageProps & {
    source?: ImageURISource;
};

interface AvatarProps extends ImageProps {
    onChange?: (image: takenImage) => void;
    imageHeight?: number;
}

export const AvatarCreation = (props: AvatarProps) => {
    const [uri, setUri] = React.useState(props.source?.uri || undefined);

    const imageTaken = (image: takenImage) => {
        setUri(image.path);
        props.onChange?.(image);
    }


    const pickPicture = () => {
        takePicture({
            onImageTaken: imageTaken
        });
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
                <Icon name='emoticon-outline' style={styles.avatar}></Icon>
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
                /> :
                <Icon name='emoticon-outline' style={[styles.miniAvatar, { fontSize: props.imageHeight, height: props.imageHeight, width: props.imageHeight }, props.style, sharedStyle.darkFontColor]} ></Icon>
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
                /> :
                <Icon name='plus' style={[styles.miniAvatar, { fontSize: props.imageHeight, height: props.imageHeight, width: props.imageHeight, fontWeight: 'light' }, props.style, sharedStyle.darkFontColor]} ></Icon>
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
        borderRadius: 1000, 
        borderColor: '#FFC700',
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        color: sharedStyle.darkFontColor.color
    },
    miniAvatar: {
        width: 20,
        height: 20,
        backgroundColor: "#E8E8E8",
        borderRadius: 1000, 
        borderColor: '#FFC700',
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
