import { MyCircleFriend } from './../../types';
import { SET_MYCIRCLE_FRIENDS } from "../actions/types/MyCircleActions.types";

const initialState = {
    myCircle: []
}

const myCircleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MYCIRCLE_FRIENDS:
            return { ...state, myCircle: action.payload }
        default:
            return state
    }
}

export default myCircleReducer;