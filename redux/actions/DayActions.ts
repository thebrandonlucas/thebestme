import { DayType, IDayType } from './../../types';
import {SET_DAY, FINISH_DAY, CLEAR_DAY, SELECT_DAY} from './types/DayActions.types';

export const setDayInfo = (dayInfo: DayType) => {
    return {
        type: SET_DAY,
        payload: dayInfo
    }
}

export function saveDay(dayInfo: IDayType) {
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

/**
 * Set a specific selected day in redux
 * @param selectedDay - The day selected in ISO format
 */
export const selectDay = (selectedDay: string) => {
    return {
        type: SELECT_DAY,
        payload: selectedDay
    }
}