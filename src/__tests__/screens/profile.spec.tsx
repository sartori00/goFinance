import React from 'react';
import { render } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

describe('Profile', () => {
  it('Check if show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);

    expect(getByPlaceholderText('Nome')).toBeTruthy();
  });

  it('Check if user data has been loaded', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Rodrigo');
    expect(inputSurname.props.value).toEqual('Sartori');
  });

  it('checks if title render correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});
