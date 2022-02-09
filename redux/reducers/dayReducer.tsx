import { DateTime } from 'luxon';
import { DayReducerType, DayType, IDayType } from '../../types';
// This object should reinitialize at the start of the next day (user's local time),
import {
  FINISH_DAY,
  NEW_DAY,
  SET_DAY,
} from '../actions/types/DayActions.types';
// Key value pairing
// 'isoDateString.finishDayCount': dayInfo
// days: { '2021-01-01.2': day }

// and save whatever is in it upon rollover (if anything);
const initialState: DayReducerType = {
  days: {},
};

const dayReducer = (state = initialState, action) => {
  console.log('here1', action.type);
  let tempDays: IDayType;
  switch (action.type) {
    case SET_DAY:
      tempDays = { ...state.days, [action.payload.date]: action.payload };
      return { ...state, days: tempDays };
    case FINISH_DAY:
      tempDays = { ...state.days, ...action.payload };
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
        finishDayClickedCount: 0,
      };
      tempDays = { ...state.days, [newDay.date]: { ...newDay } };
      return { ...state, days: tempDays };
    default:
      return state;
  }
};

export default dayReducer;
