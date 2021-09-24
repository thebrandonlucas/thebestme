import { ADD_HABIT, DELETE_HABIT, UPDATE_HABIT, TOGGLE_HABIT } from "../actions/types/HabitActions.types"
const initialState = {
    habits: {},
}

const habitReducer = (state = initialState, action) => {
    let tempHabits = state.habits;
    switch (action.type) {
        case ADD_HABIT:
            tempHabits = { ...tempHabits, ...action.payload};
            return { ...state, habits: tempHabits }
        case DELETE_HABIT:
            delete tempHabits[action.payload.id];
            return { ...state, habits: tempHabits }
        case UPDATE_HABIT:
            tempHabits[action.payload.id].text = action.payload.text;
            return { ...state, habits: tempHabits }
        case TOGGLE_HABIT:
            tempHabits[action.payload.id].checked = !action.payload.checked
            return { ...state, habits: tempHabits }
        default:
            return state
    }
}

export default habitReducer;