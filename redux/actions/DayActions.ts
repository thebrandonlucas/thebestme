import { DayType } from './../../types';
import {SET_DAY, FINISH_DAY, CLEAR_DAY} from './types/DayActions.types';

export const setDayInfo = (dayInfo: DayType) => {
    console.log('dayhere')
    return {
        type: SET_DAY,
        payload: dayInfo
    }
}

export function saveDay(dayInfo: DayType) {
    return {
        type: FINISH_DAY,
        payload: dayInfo
    }
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