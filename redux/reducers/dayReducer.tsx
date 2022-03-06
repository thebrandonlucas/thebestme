import { DateTime } from 'luxon';
import { DayReducerType, DayType, IDayType } from '../../types';
// This object should reinitialize at the start of the next day (user's local time),
import {
  FINISH_DAY,
  NEW_DAY,
  SET_DAY,
} from '../actions/types/DayActions.types';
import { RESET_APP } from '../actions/types/RootActions.types';

const initialState: DayReducerType = {
  days: {},
};

const dayReducer = (state = initialState, action) => {
  let tempDays: IDayType = { ...state.days };
  switch (action.type) {
    case SET_DAY:
      tempDays = { ...tempDays, [action.payload.date]: action.payload };
      return { ...state, days: tempDays };
    case FINISH_DAY:
      tempDays = { ...tempDays, ...action.payload };
      return { ...state, days: tempDays };
    case NEW_DAY:
      const newDay: DayType = {
        date: DateTime.now().toISODate(),
        finishedHabitIds: [],
        remainingHabitIds: action.payload,
        cbtIds: [],
        journalIds: [],
        mood: [],
        endOfDayNotes: [],
        finishedHabitCount: 0,
        habitCount: 0,
        habitPercentComplete: 0,
      };
      tempDays = { ...tempDays, [newDay.date]: { ...newDay } };
      return { ...state, days: tempDays };
    case RESET_APP:
      return initialState;
    default:
      return state;
  }
};

export default dayReducer;
