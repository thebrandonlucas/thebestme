import { HabitType, IHabitType } from "../../types";
import { ADD_HABIT, DELETE_HABIT, UPDATE_HABIT, TOGGLE_HABIT, RESET_HABITS} from "./types/HabitActions.types";

/**
 * Add a habit
 * @param habit 
 * @returns
 */
export function addHabit(habit: IHabitType) {
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

/**
 * Update a habit's text
 * @param id 
 * @param text 
 * @returns 
 */
export function updateHabit(id: string, text: string) {
    return {
        type: UPDATE_HABIT,
        payload: {id, text}
    }
}

/**
 * Toggle's a habit from remaining to finished, or vice versa
 * @param id
 * @param checked - bool indicating if the habit is finished or not
 * @returns 
 */
export function toggleHabit(id: string, checked: boolean) {
    return {
        type: TOGGLE_HABIT,
        payload: { id, checked }
    }
}

/**
 * Reset all habits to unchecked (incomplete)
 */
export function resetHabits() {
    return {
        type: RESET_HABITS
    }
}