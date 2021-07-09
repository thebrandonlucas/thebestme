import { render } from '@testing-library/react-native';
import React from 'react';
import HabitsScreen from '../../screens/HabitsScreen';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
// TODO: import firebase api caller

describe('HabitsScreen', () => {
  it('should render buttons', () => {
    const { queryByTestId } = render(<HabitsScreen />);
    expect(queryByTestId('finishDay')).not.toBeNull();
  });

  it('should display date', () => {

  });

  it('should render remaining habits', () => {
    // TODO: mock firebase call
  });

  it('should render finished habits', () => {});

  it('checks a remaining task and moves it to finished', () => {});

  it('unchecks a finished task and moves it back to remaining', () => {});

  it('should save the journal entry', () => {});

  it('should redirect to past entries', () => {});

  it('should add a habit', () => {});

  it('should delete a habit', () => {});

  it('should edit a habit', () => {});

  it ('should navigate to finish day page', () => {});
});
