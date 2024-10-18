import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';
jest.mock('@helpers/Image/ImageTaker');

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
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

describe('renders correctly', () => {
  it('renders Maxi Yatzy correctly', () => {
    // Arrange

    // Act
    const {getByText} = render(<App />);

    // Assert
    const maxiYatzyElements = getByText('Maxi Yatzy');
    expect(maxiYatzyElements).toHaveLength(2);
  });
});
