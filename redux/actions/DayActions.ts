import { DayType } from './../../types';
import {SET_DAY, FINISH_DAY, CLEAR_DAY} from './types/DayActions.types';

export const setDayInfo = (dayInfo: DayType) => {
    return {
        type: SET_DAY,
        payload: dayInfo
    }
}

export function saveDay() {
    return {
        type: FINISH_DAY,
        payload: {}
    }
}

export async function getDayFromStorage() {

}

/**
 * Sets dayInfo object to original state
 * @returns 
 */
export const clearDay = () => {
    return {
        type: CLEAR_DAY
    }
}