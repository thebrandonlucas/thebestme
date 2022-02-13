import { DescriptionType } from '../../types';
import {
  SET_DESCRIPTION,
  SET_DESCRIPTION_DISPLAY,
} from '../actions/types/DescriptionActions.types';

const initialState: { infoType: DescriptionType; isDisplaying: boolean } = {
  infoType: 'home',
  isDisplaying: false,
};

const descriptionReducer = (state = initialState, action) => {
  console.log('descriptionreducer', action)
  switch (action.type) {
    case SET_DESCRIPTION:
      return { ...state, infoType: action.payload };
    case SET_DESCRIPTION_DISPLAY:
      return { ...state, isDisplaying: action.payload };
    default:
      return state;
  }
};

export default descriptionReducer;
