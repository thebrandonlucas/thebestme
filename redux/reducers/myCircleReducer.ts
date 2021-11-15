import { MyCircleFriend, MyCircleReducerType } from './../../types';
import { SET_MYCIRCLE_FRIENDS, SET_PANIC_MESSAGE_TEXT, SET_SENDING_PANIC_MESSAGE } from "../actions/types/MyCircleActions.types";

const initialState: MyCircleReducerType = {
    myCircle: [],
    isSendingPanicMessage: false,
    panicMessage: 'panic message default',
}

const myCircleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MYCIRCLE_FRIENDS:
            return { ...state, myCircle: action.payload }
        case SET_SENDING_PANIC_MESSAGE:
            return { ...state, isSendingPanicMessage: action.payload }
        case SET_PANIC_MESSAGE_TEXT:
            return { ...state, panicMessage: action.payload }
        default:
            return state
    }
}

export default myCircleReducer;