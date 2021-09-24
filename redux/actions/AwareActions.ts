import { AwareJournalEntryType } from './../../types';
import { SAVE_AWARE_JOURNAL, DELETE_AWARE_JOURNAL, UPDATE_AWARE_JOURNAL } from "./types/AwareActions.types";

/**
 * Save a journal
 * @param awareJournal
 * @returns
 */
export function saveAwareJournal(awareJournal: AwareJournalEntryType) {
    console.log('aware', awareJournal)
    return {
        type: SAVE_AWARE_JOURNAL,
        payload: awareJournal
    }
}

export function deleteAwareJournal(id: string) {
    return {
        type: DELETE_AWARE_JOURNAL,
        payload: { id }
    }
}

export function updateAwareJournal(
    id: string,
    acknowledgeAndAcceptText: string,
    waitAndWatchText: string,
    actionsText: string,
    repeatText: string,
    endText: string,
) {
    return {
        type: UPDATE_AWARE_JOURNAL,
        payload: {
            id,
            acknowledgeAndAcceptText,
            waitAndWatchText,
            actionsText,
            repeatText,
            endText
        }
    }
}