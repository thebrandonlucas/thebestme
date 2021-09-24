import { HabitType } from "../../types";
import { ADD_HABIT, DELETE_HABIT, UPDATE_HABIT, TOGGLE_HABIT } from "./types/HabitActions.types";

/**
 * Add a habit
 * @param habit 
 * @returns
 */
export function addHabit(habit: HabitType) {
    return {
        type: ADD_HABIT,
        payload: habit
    }
}

/**
 * Delete a habit by it's uuid
 * @param id - uuid string id for habit
 * @returns 
 */
export function deleteHabit(id: string) {
    return {
        type: DELETE_HABIT,
        payload: {id}
    }
}

export function updateHabit(id: string, text: string) {
    return {
        type: UPDATE_HABIT,
        payload: {id, text}
    }
}

export function toggleHabit(id: string, checked: boolean) {
    return {
        type: TOGGLE_HABIT,
        payload: { id, checked }
    }
}