import { SAVE_JOURNAL, UPDATE_JOURNAL, DELETE_JOURNAL } from "../actions/types/JournalActions.types";

const initialState = {
    journals: {},
    journalCount: 0
}

const journalReducer = (state = initialState, action) => {
    let tempJournals = state.journals;
    switch (action.type) {
        case SAVE_JOURNAL:
            tempJournals = { ...tempJournals, ...action.payload};
            return { ...state, journals: tempJournals }
        case DELETE_JOURNAL:
            delete tempJournals[action.payload.id];
            return { ...state, journals: tempJournals }
        case UPDATE_JOURNAL:
            tempJournals[action.payload.id].text = action.payload.text;
            return { ...state, journals: tempJournals }
        default:
            return state
    }
}

export default journalReducer;