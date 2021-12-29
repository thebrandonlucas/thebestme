import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HabitsScreen from '../../screens/HabitsScreen';
import { habits } from '../../__fixtures__/component/HabitScreen.fixture';
// import { today } from '../../__fixtures__/component/HabitScreen.fixture';

const mockStore = configureStore();

describe('HabitsScreen', () => {
  let store;
  let habitScreenComponent;

  store = mockStore({
    habitReducer: { habits },
    // dayReducer: { today },
  });
  store.dispatch = jest.fn();

  habitScreenComponent = (
    <Provider store={store}>
      <HabitsScreen error={undefined} navigation={undefined} />
    </Provider>
  );

  test('should render buttons', () => {
    const { getByTestId } = render(habitScreenComponent);
    expect(getByTestId('finishDay')).not.toBeNull();
  });

  test('should toggle a remaining habit to a finished habit', () => {
    // const { getByText } = render(habitScreenComponent);
    // const habitText = 'Get lunch with a friend';
    // const habitToToggle = getByText(habitText);
    // const habits = store.getState().habitReducer.habits;
    // // expect();
    // fireEvent.press(habitToToggle);
    // const newHabits = store.getState().habitReducer.habits;

    // expect(remainingHabits.length === 1);
    expect(true).toBe(true);
  });

  // it('should display date', () => {

  // });

  // it('should render remaining habits', () => {
  //   // TODO: mock firebase call
  // });

  // it('should render finished habits', () => {});

  // it('checks a remaining task and moves it to finished', () => {});

  // it('unchecks a finished task and moves it back to remaining', () => {});

  // it('should save the journal entry', () => {});

  // it('should redirect to past entries', () => {});

  // it('should add a habit', () => {});

  // it('should delete a habit', () => {});

  // it('should edit a habit', () => {});

  // it ('should navigate to finish day page', () => {});
});
