import { DescriptionType } from '../../types';
import { SET_DESCRIPTION } from './../actions/types/DescriptionActions.types';

const initialState: { infoType: DescriptionType } = {
    infoType: 'closed'
}

const descriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DESCRIPTION:
            return { ...state, infoType: action.payload }
        default:
            return state
    }
}

export default descriptionReducer;