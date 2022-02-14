import { DescriptionType } from '../../types';
import {
  SET_DESCRIPTION,
  SET_DESCRIPTION_DISPLAY,
  SET_JOURNAL_DESCRIPTION,
} from '../actions/types/DescriptionActions.types';

const initialState: {
  infoType: DescriptionType;
  journalInfoType: 'journal' | 'cbt';
  isDisplaying: boolean;
} = {
  infoType: 'home',
  journalInfoType: 'journal',
  isDisplaying: false,
};

const descriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DESCRIPTION:
      return { ...state, infoType: action.payload };
    case SET_JOURNAL_DESCRIPTION:
      return { ...state, journalInfoType: action.payload };
    case SET_DESCRIPTION_DISPLAY:
      return { ...state, isDisplaying: action.payload };
    default:
      return state;
  }
};

export default descriptionReducer;
