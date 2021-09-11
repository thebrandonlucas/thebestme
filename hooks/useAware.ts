import { JournalEntryType, AwareJournalEntryType } from './../types';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';


const db = firebase.firestore();

/** 
 * Hook to get AWARE Journals from firebase
 */
// TODO: implement user id
export function useAware() {
    const [journals, setJournals] = useState<AwareJournalEntryType[]>([]);
    const [dbJournals, loading, error] = useCollection(firebase.firestore().collection('awareJournal'));
    useEffect(() => {
        if (!loading) {
            var tempJournals = [];
            dbJournals.docs.map((doc) => {
                const { 
                    date,
                    acknowledgeAndAcceptText,
                    waitAndWatchText,
                    actionsText,
                    repeatText,
                    endText 
                } = doc.data();
                const journalEntry: AwareJournalEntryType = {
                    id: doc.id, 
                    date,
                    acknowledgeAndAcceptText,
                    waitAndWatchText,
                    actionsText,
                    repeatText,
                    endText,
                };
                tempJournals.push(journalEntry);
            });
            setJournals(tempJournals);
        }
    }, [loading, dbJournals]);
    
    return {journals, loading, error};
}