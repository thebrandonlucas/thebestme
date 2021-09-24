import { JournalEntryType } from './../../types';
import { SAVE_JOURNAL, UPDATE_JOURNAL, DELETE_JOURNAL } from "./types/JournalActions.types";

/**
 * Save a journal
 * @param journal 
 * @returns
 */
export function saveJournal(journal: JournalEntryType) {
    return {
        type: SAVE_JOURNAL,
        payload: journal
    }
}

export function deleteJournal(id: string) {
    return {
        type: DELETE_JOURNAL,
        payload: {id}
    }
}

export function updateJournal(id: string, text: string) {
    return {
        type: UPDATE_JOURNAL,
        payload: {id, text}
    }
}