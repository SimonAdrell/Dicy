import ImagePicker from 'react-native-image-crop-picker';
import { takenImage } from './takenImage';

export type pickPictureProps = {
    onImageTaken?: (image: takenImage) => void;
}

const takePicture = (props: pickPictureProps) => {
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
    }).then(image => {
        props.onImageTaken?.({ path: image.path });
    })
};

export default takePicture;