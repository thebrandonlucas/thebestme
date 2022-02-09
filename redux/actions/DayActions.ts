import { IHabitType } from './../../__fixtures__/component/types';
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
 * Sets dayInfo object to original state, sets each habit back to remainingHabits
 * @returns 
 */
export const clearDay = (habits: IHabitType) => {
    return {
        type: CLEAR_DAY,
        payload: habits
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