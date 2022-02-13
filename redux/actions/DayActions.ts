import { DayType, IDayType, IHabitType } from './../../types';
import {SET_DAY, FINISH_DAY, NEW_DAY, SELECT_DAY} from './types/DayActions.types';

export const setDayInfo = (dayInfo: DayType) => {
    return {
        type: SET_DAY,
        payload: dayInfo
    }
}

export function saveDay(dayInfo: IDayType) {
  console.log('saveDay', dayInfo)
    return {
        type: FINISH_DAY,
        payload: dayInfo
    }
}

/**
 * Sets dayInfo object to original state, sets each habit back to remainingHabits
 * @returns 
 */
export const newDay = (habits: IHabitType) => {
    return {
        type: NEW_DAY,
        payload: Object.keys(habits)
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