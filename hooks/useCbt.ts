import { AwareJournalEntryType, CbtJournalEntryType } from './../types';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

const db = firebase.firestore();

/**
 * Hook to get AWARE Journals from firebase
 */
// TODO: implement user id
export function useCbt() {
    const [journals, setJournals] = useState<CbtJournalEntryType[]>([]);
    const [dbJournals, loading, error] = useCollection(firebase.firestore().collection('cbtJournal'));
    useEffect(() => {
        if (!loading) {
            var tempJournals = [];
            dbJournals.docs.map((doc) => {
                const { 
                    date,
                    situationText,
                    thoughtsText,
                    emotionsText,
                    behaviorsText,
                    alternativeThoughtsText 
                } = doc.data();
                const journalEntry: CbtJournalEntryType = {
                    id: doc.id, 
                    date,
                    situationText,
                    thoughtsText,
                    emotionsText,
                    behaviorsText,
                    alternativeThoughtsText 
                };
                tempJournals.push(journalEntry);
            });
            setJournals(tempJournals);
        }
    }, [loading, dbJournals]);
    
    return {journals, loading, error};
}