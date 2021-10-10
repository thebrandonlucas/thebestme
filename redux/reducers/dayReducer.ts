// This object should reinitialize at the start of the next day (user's local time),

import { CLEAR_DAY, FINISH_DAY, SET_DAY } from "../actions/types/DayActions.types"

// Key value pairing
// 'isoDateString.finishDayCount': dayInfo
// days: { '2021-01-01.2': day }

// and save whatever is in it upon rollover (if anything);
const initialState = {
    days: {},
    today: {
        // ISO string YYYY-MM-DD (in local time) representing the date
        date: null,
        // ISO timestamp (via new Date().toISOString()) holding the exact time the user finishDay (append new timestamp for each press)
        datetimes: [],
        // FIXME: AsyncStorage doesn't recognize set objects, should we use array instead or convert to array upon upload
        // then back to set when downloading?
        finishedHabitIds: [],
        remainingHabitIds: [],
        cbtIds: [],
        awareIds: [],
        journalIds: [],
        // Array of 'mood' chars: ['h', 'n', 's', ...]
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
            const tempDays = { ...state.days, [state.today.date]: { ...state.today }};
            return { ...state, days: tempDays }
        case CLEAR_DAY:
            return initialState
        default:
            return state
    }
}

export default dayReducer;