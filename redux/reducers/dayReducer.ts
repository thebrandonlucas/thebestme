import { DayType, IDayType, DayReducerType } from './../../types';
// This object should reinitialize at the start of the next day (user's local time),

import { CLEAR_DAY, FINISH_DAY, SET_DAY } from "../actions/types/DayActions.types"
import { DateTime } from 'luxon';
// Key value pairing
// 'isoDateString.finishDayCount': dayInfo
// days: { '2021-01-01.2': day }

// and save whatever is in it upon rollover (if anything);
const initialState: DayReducerType = {
    days: {},
    today: {
        id: '',
        // ISO string YYYY-MM-DD (in local time) representing the date
        date: DateTime.now().toISODate(),
        // ISO timestamp (via new Date().toISOString()) holding the exact time the user finishDay (append new timestamp for each press)
        // datetimes: [],
        // FIXME: AsyncStorage doesn't recognize set objects, should we use array instead or convert to array upon upload
        // then back to set when downloading?
        habitIds: [],
        cbtIds: [],
        awareIds: [],
        journalIds: [],
        // Array of 'mood' chars: ['happy', 'neutral', 'sad', ...]
        habitCount: 0,
        habitPercentComplete: 0,
        finishedHabitCount: 0,
        mood: [],
        // String Array of EOD Notes
        endOfDayNotes: [],
        // How many times did the user actually click "finish Day"? If none, default to 0
        finishDayClickedCount: 0,
    }
}

const dayReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DAY:
            return { ...state, today: action.payload }
        case FINISH_DAY:
            const tempDays = { ...state.days, ...action.payload };
            return { ...state, days: tempDays }
        case CLEAR_DAY:
            return { ...state, today: initialState.today}
        default:
            return state
    }
}

export default dayReducer;