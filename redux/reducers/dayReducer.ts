import { DayType, IDayType, DayReducerType } from './../../types';
// This object should reinitialize at the start of the next day (user's local time),

import { CLEAR_DAY, FINISH_DAY, SET_DAY, SELECT_DAY } from "../actions/types/DayActions.types"
import { DateTime } from 'luxon';
// Key value pairing
// 'isoDateString.finishDayCount': dayInfo
// days: { '2021-01-01.2': day }

// and save whatever is in it upon rollover (if anything);
const initialState: DayReducerType = {
    days: {},
}

const dayReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DAY:
            return { ...state, today: action.payload }
        case FINISH_DAY:
            const tempDays = { ...state.days, ...action.payload };
            return { ...state, days: tempDays }
        case CLEAR_DAY:
            return { ...state, today: {...initialState, remainingHabits: action.payload }}
        case SELECT_DAY:
            return { ...state, selectedDay: action.payload }
        default:
            return state
    }
}

export default dayReducer;