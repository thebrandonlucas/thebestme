import { SAVE_CBT_JOURNAL, DELETE_CBT_JOURNAL, UPDATE_CBT_JOURNAL } from "../actions/types/CbtActions.types";

const initialState = {
    cbtJournals: {},
    cbtJournalCount: 0
}

const cbtJournalReducer = (state = initialState, action) => {
    let tempCbtJournals = state.cbtJournals;
    switch (action.type) {
        case SAVE_CBT_JOURNAL:
            tempCbtJournals = { ...tempCbtJournals, ...action.payload};
            return { ...state, cbtJournals: tempCbtJournals }
        case DELETE_CBT_JOURNAL:
            delete tempCbtJournals[action.payload.id];
            return { ...state, cbtJournals: tempCbtJournals }
        case UPDATE_CBT_JOURNAL:
            tempCbtJournals[action.payload.id].situationText = action.payload.situationText;
            tempCbtJournals[action.payload.id].thoughtsText = action.payload.thoughtsText;
            tempCbtJournals[action.payload.id].emotionsText = action.payload.emotionsText;
            tempCbtJournals[action.payload.id].behaviorsText = action.payload.behaviorsText;
            tempCbtJournals[action.payload.id].alternativeThoughtsText = action.payload.alternativeThoughtsText;
            return { ...state, cbtJournals: tempCbtJournals }
        default:
            return state
    }
}

export default cbtJournalReducer;