import { render } from '@testing-library/react-native';
import React from 'react';
import Hello from '../../Hello';

describe('Hello', () => {
  it('should render the correct message', () => {
    const { queryByText } = render(<Hello />);
    expect(queryByText('Hello, world!')).not.toBeNull();
  });
});
