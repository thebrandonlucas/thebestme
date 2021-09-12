const initialState: object = {
    date: null,
    // FIXME: Firebase doesn't recognize set objects, should we use array instead or convert to array upon upload
    // then back to set when downloading?
    finishedHabitIds: new Set(),
    remainingHabitIds: new Set(),
    cbtIds: [],
    awareIds: [],
    journalIds: [],
    mood: '',
    endOfDayNotes: '',
    isDayFinished: false,
}

const dayReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DAY':
            return action.payload
        case 'FINISH_DAY':
            return action.payload
        case 'FINISH_DAY_SUCCESS':
            console.log('suc')
            return action.payload
        case 'FINISH_DAY_FAILURE':
            return action.payload
        default:
            return state
    }
}

export default dayReducer;