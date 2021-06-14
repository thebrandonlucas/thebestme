import { render } from '@testing-library/react-native';
import React from 'react';
import HabitsScreen from '../../screens/HabitsScreen';
// TODO: import firebase api caller

describe('HabitsScreen', () => {
  it('should render buttons', () => {
    const { queryByTestId } = render(<HabitsScreen />);
    expect(queryByTestId('newHabit')).not.toBeNull();
    expect(queryByTestId('finishDay')).not.toBeNull();
  });

  it('should display date', () => {});

  it('should render remaining habits', () => {
    // TODO: mock firebase call
  });

  it('should render finished habits', () => {});

  it('checks a remaining task and moves it to finished', () => {});

  it('unchecks a finished task and moves it back to remaining', () => {});

  it('should save the journal entry', () => {});

  it('should redirect to past entries', () => {});
});
