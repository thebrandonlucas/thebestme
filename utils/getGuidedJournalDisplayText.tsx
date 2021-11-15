import { AwareJournalEntryType, CbtJournalEntryType } from '../types';

/**
 * Get the first non-empty text field of either the CBT or AWARE journals to display
 * in the list page.
 *
 * Ex. if CBT Journal data is = {
 *      situation: '',
 *      thoughts: '',
 *      emotions: 'I felt bad today',
 *      behaviors: '',
 *      alternativeThoughts: 'There are bright sides I'm not giving credit'
 * }
 *
 * Then what will display in the card's short text is 'I felt bad today'
 */
export function getGuidedJournalDisplayText(
  guidedJournal: CbtJournalEntryType | AwareJournalEntryType
): string {
  for (const key in guidedJournal) {
    const currentText = guidedJournal[key];
    // Skip irrelevant non-journal keys
    const isNotIrrelevantKey = key !== 'id' && key !== 'date';
    if (isNotIrrelevantKey && currentText.length) {
      return currentText;
    }
  }
  return 'Error - Guided Journal Display Text';
}
