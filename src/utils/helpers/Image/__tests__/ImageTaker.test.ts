import {Alert, AlertButton, Linking} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import takePicture from '../ImageTaker';

jest.mock('i18next', () => ({
  t: (key: string): string => key,
}));

const openCamera = ImagePicker.openCamera as jest.Mock;
const pickerError = (code: string) => Object.assign(new Error(code), {code});

describe('takePicture', () => {
  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    alertSpy.mockRestore();
  });

  it('passes the taken image path to onImageTaken', async () => {
    openCamera.mockResolvedValueOnce({path: 'file:///photo.jpg'});
    const onImageTaken = jest.fn();

    await takePicture({onImageTaken});

    expect(onImageTaken).toHaveBeenCalledWith({path: 'file:///photo.jpg'});
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('does nothing when the user cancels', async () => {
    openCamera.mockRejectedValueOnce(pickerError('E_PICKER_CANCELLED'));
    const onImageTaken = jest.fn();

    await takePicture({onImageTaken});

    expect(onImageTaken).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('explains and offers Settings when camera permission is denied', async () => {
    openCamera.mockRejectedValueOnce(pickerError('E_NO_CAMERA_PERMISSION'));
    const openSettings = jest
      .spyOn(Linking, 'openSettings')
      .mockResolvedValue(undefined);

    await takePicture({});

    expect(alertSpy).toHaveBeenCalledWith(
      'camera.noPermissionTitle',
      'camera.noPermissionMessage',
      expect.any(Array),
    );
    const buttons = alertSpy.mock.calls[0][2] as AlertButton[];
    expect(buttons.map(b => b.text)).toEqual([
      'camera.cancel',
      'camera.openSettings',
    ]);
    buttons[1].onPress?.();
    expect(openSettings).toHaveBeenCalled();
    openSettings.mockRestore();
  });

  it.each([
    'E_CAMERA_IS_NOT_AVAILABLE',
    'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR',
  ])('says no camera is available for %s', async code => {
    openCamera.mockRejectedValueOnce(pickerError(code));

    await takePicture({});

    expect(alertSpy).toHaveBeenCalledWith('camera.notAvailable');
  });

  it('shows a generic message for other errors', async () => {
    openCamera.mockRejectedValueOnce(new Error('boom'));

    await takePicture({});

    expect(alertSpy).toHaveBeenCalledWith('camera.failed');
  });

  it('does not report errors thrown by onImageTaken as camera errors', async () => {
    openCamera.mockResolvedValueOnce({path: 'file:///photo.jpg'});
    const onImageTaken = jest.fn(() => {
      throw new Error('callback failed');
    });

    await expect(takePicture({onImageTaken})).rejects.toThrow(
      'callback failed',
    );
    expect(alertSpy).not.toHaveBeenCalled();
  });
});
