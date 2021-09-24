import { CbtJournalEntryType } from './../../types';
import { SAVE_CBT_JOURNAL, DELETE_CBT_JOURNAL, UPDATE_CBT_JOURNAL } from "./types/CbtActions.types";

/**
 * Save a journal
 * @param cbtJournal
 * @returns
 */
export function saveCbtJournal(cbtJournal: CbtJournalEntryType) {
    return {
        type: SAVE_CBT_JOURNAL,
        payload: cbtJournal
    }
}

export function deleteCbtJournal(id: string) {
    return {
        type: DELETE_CBT_JOURNAL,
        payload: { id }
    }
}

export function updateCbtJournal(
    id: string,
    situationText: string,
    thoughtsText: string, 
    emotionsText: string,
    behaviorsText: string,
    alternativeThoughtsText: string
) {
    return {
        type: UPDATE_CBT_JOURNAL,
        payload: {
            id,
            situationText,
            thoughtsText,
            emotionsText,
            behaviorsText,
            alternativeThoughtsText
        }
    }
}