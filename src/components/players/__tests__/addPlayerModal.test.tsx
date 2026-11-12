import {render, screen, userEvent} from '@testing-library/react-native';
import {AddUserModal} from '../addPlayerModal';
jest.mock('@helpers/Image/ImageTaker');

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string): string => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

async function setup<T>(jsx: React.ReactElement<T>) {
  return {
    user: userEvent.setup(),
    ...(await render(jsx)),
  };
}

test('Triggers function when pressing button', async () => {
  //   const user = userEvent.setup();
  const visible = true;
  const onBackdropPress = () => {};
  const mockFn = jest.fn();

  const {user} = await setup(
    <AddUserModal
      visible={visible}
      onSubmit={mockFn}
      onBackdropPress={onBackdropPress}
      name={'player.addPlayerHeader'}
    />,
  );

  await user.type(screen.getByTestId('App.username'), 'Player name');
  await user.press(screen.getByText('player.addNewPlayerSaveButton'));

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith('Player name', '');
});
