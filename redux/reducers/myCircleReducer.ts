import { MyCircleFriend } from './../../types';
import { SET_MYCIRCLE_FRIENDS, SET_SENDING_PANIC_MESSAGE } from "../actions/types/MyCircleActions.types";

const initialState = {
    myCircle: [],
    isSendingPanicMessage: false,
}

const myCircleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MYCIRCLE_FRIENDS:
            return { ...state, myCircle: action.payload }
        case SET_SENDING_PANIC_MESSAGE:
            return { ...state, isSendingPanicMessage: action.payload }
        default:
            return state
    }
}

export default myCircleReducer;