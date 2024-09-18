import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';
jest.mock('@helpers/Image/ImageTaker');

describe("renders correctly", () => {
  it("renders Yatzy correctly", () => {
    // Arrange

    // Act
    const {getByPlaceholderText, getByText, getAllByText} = render(<App />);

    // Assert
    const yatzyElements = getAllByText('Yatzy');
    expect(yatzyElements).toHaveLength(1);
  })
})


describe("renders correctly", () => {
  it("renders Maxi Yatzy correctly", () => {
    // Arrange

    // Act
    const {getByPlaceholderText, getByText, getAllByText} = render(<App />);

    // Assert
    const maxiYatzyElements = getAllByText('Maxi Yatzy');
    expect(maxiYatzyElements).toHaveLength(1);
  })
})