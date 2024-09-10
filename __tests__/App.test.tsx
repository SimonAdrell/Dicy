import 'react-native';
import React from 'react';
import App from '../App';
import { fireEvent, render } from '@testing-library/react-native';
jest.mock('../src/Helpers/Image/ImageTaker');

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
    const maxiYatxuElements = getAllByText('Maxi Yatzy');
    expect(maxiYatxuElements).toHaveLength(1);
  })
})