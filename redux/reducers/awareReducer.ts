import { SAVE_AWARE_JOURNAL, DELETE_AWARE_JOURNAL, UPDATE_AWARE_JOURNAL } from "../actions/types/AwareActions.types";

const initialState = {
    awareJournals: {},
    awareJournalCount: 0
}

const awareJournalReducer = (state = initialState, action) => {
    let tempAwareJournals = state.awareJournals;
    switch (action.type) {
        case SAVE_AWARE_JOURNAL:
            tempAwareJournals = { ...tempAwareJournals, ...action.payload};
            return { ...state, awareJournals: tempAwareJournals }
        case DELETE_AWARE_JOURNAL:
            delete tempAwareJournals[action.payload.id];
            return { ...state, awareJournals: tempAwareJournals }
        case UPDATE_AWARE_JOURNAL:
            tempAwareJournals[action.payload.id].acknowledgeAndAcceptText = action.payload.acknowledgeAndAcceptText;
            tempAwareJournals[action.payload.id].waitAndWatchText = action.payload.waitAndWatchText;
            tempAwareJournals[action.payload.id].actionsText = action.payload.actionsText;
            tempAwareJournals[action.payload.id].repeatText = action.payload.repeatText;
            tempAwareJournals[action.payload.id].endText = action.payload.endText;
            return { ...state, awareJournals: tempAwareJournals }
        default:
            return state
    }
}

// acknowledgeAndAcceptText,
// waitAndWatchText,
// actionsText,
// repeatText,
// endText,

export default awareJournalReducer;