import { HabitReducerType } from '../../types';
import {
  ADD_HABIT,
  DELETE_HABIT,
  RESET_HABITS,
  TOGGLE_HABIT,
  UPDATE_HABIT,
} from '../actions/types/HabitActions.types';

const initialState: HabitReducerType = {
  habits: {},
};

const habitReducer = (state = initialState, action) => {
  let tempHabits = state.habits;
  const habitIds: string[] = Object.keys(tempHabits);
  switch (action.type) {
    case ADD_HABIT:
      tempHabits = { ...tempHabits, ...action.payload };
      return { ...state, habits: tempHabits };
    case DELETE_HABIT:
      tempHabits[action.payload.id].deleted = true;
      return { ...state, habits: tempHabits };
    case UPDATE_HABIT:
      tempHabits[action.payload.id].text = action.payload.text;
      return { ...state, habits: tempHabits };
    case TOGGLE_HABIT:
      tempHabits[action.payload.id].checked = !action.payload.checked;
      return { ...state, habits: tempHabits };
    case RESET_HABITS:
      for (let i = 0; i < habitIds.length; i++) {
        tempHabits[habitIds[i]].checked = false;
      }
      return { ...state, habits: tempHabits };
    default:
      return state;
  }
};

export default habitReducer;
