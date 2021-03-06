import { SET_DESCRIPTION, SET_DESCRIPTION_DISPLAY, SET_JOURNAL_DESCRIPTION } from './types/DescriptionActions.types';
import { DescriptionType } from "../../types";

export function setDescription(infoType: DescriptionType) {
    return {
        type: SET_DESCRIPTION,
        payload: infoType
    }
}
export function setJournalDescription(infoType: 'journal' | 'cbt') {
  return {
      type: SET_JOURNAL_DESCRIPTION,
      payload: infoType
  }
}
export function setDescriptionIsDisplaying(isDisplaying: boolean) {
  return {
    type: SET_DESCRIPTION_DISPLAY,
    payload: isDisplaying
  }
}