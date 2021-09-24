import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDateFromISOString } from '../../utils';
import { DayType } from '../../types';
import {SET_DAY, FINISH_DAY, FINISH_DAY_SUCCESS, FINISH_DAY_FAILURE, 
    SET_FINISH_DAY_COUNT_SUCCESS, SET_FINISH_DAY_COUNT_FAILURE, GET_FINISH_DAY_COUNT_SUCCESS, 
    GET_FINISH_DAY_COUNT_FAILURE, CLEAR_DAY} from './types/DayActions.types';


export const setDayInfo = (dayInfo) => {
    return {
        type: SET_DAY,
        payload: dayInfo
    }
}

export const uploadDayToFirebase = (dayInfo, daysCollection) => {
        daysCollection.add(dayInfo);
        return {
            type: FINISH_DAY,
            payload: dayInfo
        }

}

export async function saveDayToStorage(dayInfo: DayType, finishDayCount: number) {
    const todayDate = getDateFromISOString(dayInfo.date);
    const dayKey = `${todayDate}-day-${finishDayCount}`;
    try {
        const dayInfoString = JSON.stringify(dayInfo);
        await AsyncStorage.setItem(dayKey, dayInfoString);
        return {
            type: FINISH_DAY_SUCCESS,
            payload: dayInfo
        }
    } catch (e) {
        return {
            type: FINISH_DAY_FAILURE,
            payload: e
        }
    }
}

export async function getDayFromStorage() {

}

export async function saveFinishDayCountToStorage(isoDate: string, finishDayCount: number) {
    const finishDayCountKey = `${isoDate}-finishDayCount`;
    try {
        const finishDayCountString = finishDayCount.toString();
        await AsyncStorage.setItem(finishDayCountKey, finishDayCountString);
        return {
            type: SET_FINISH_DAY_COUNT_SUCCESS
        }
    } catch (e) {
        return {
            type: SET_FINISH_DAY_COUNT_FAILURE,
            payload: e
        }
    }
}

/**
 * Gets the number of times the user submitted 'Finish Day' for a given day
 * @param {string} isoDate - day to retrieve count for in format YYYY-MM-DD
 * @return {number} - returns number of 'Finish Day' submissions for a given day
 */
export async function getFinishDayCountFromStorage(isoDate: string) {
    const key = `${isoDate}-finishDayCount`;
    try {
        const response = await AsyncStorage.getItem(key)
        if (response !== null) {
            const finishDayCount = Number(response);
            return {
                type: GET_FINISH_DAY_COUNT_SUCCESS,
                payload: finishDayCount
            }
        }
    } catch (e) {
        return {
            type: GET_FINISH_DAY_COUNT_FAILURE,
            payload: e
        }
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