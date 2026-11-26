import {Alert, Linking} from 'react-native';
import i18n from 'i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {takenImage} from './takenImage';

export type pickPictureProps = {
  onImageTaken?: (image: takenImage) => void;
};

// Error codes rejected by react-native-image-crop-picker (iOS and Android).
const CANCELLED = 'E_PICKER_CANCELLED';
const NO_CAMERA_PERMISSION = 'E_NO_CAMERA_PERMISSION';
const NO_CAMERA = new Set([
  'E_CAMERA_IS_NOT_AVAILABLE',
  'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR',
]);

const errorCode = (error: unknown): string | undefined =>
  typeof error === 'object' && error !== null && 'code' in error
    ? String((error as {code: unknown}).code)
    : undefined;

export const handleCameraError = (error: unknown) => {
  const code = errorCode(error);

  if (code === CANCELLED) {
    // The user closed the camera or the cropper: nothing to report.
    return;
  }

  if (code === NO_CAMERA_PERMISSION) {
    Alert.alert(
      i18n.t('camera.noPermissionTitle'),
      i18n.t('camera.noPermissionMessage'),
      [
        {text: i18n.t('camera.cancel'), style: 'cancel'},
        {
          text: i18n.t('camera.openSettings'),
          onPress: () => {
            Linking.openSettings().catch(() => undefined);
          },
        },
      ],
    );
    return;
  }

  if (code !== undefined && NO_CAMERA.has(code)) {
    Alert.alert(i18n.t('camera.notAvailable'));
    return;
  }

  Alert.alert(i18n.t('camera.failed'));
};

const takePicture = (props: pickPictureProps): Promise<void> =>
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    props.onImageTaken?.({path: image.path});
  }, handleCameraError);

export default takePicture;
