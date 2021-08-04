import { JournalEntryType } from './../types';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';


const db = firebase.firestore();

/** 
 * Hook to get CBT Journals from firebase
 */
// TODO: implement user id
export function useJournals() {
    const [journals, setJournals] = useState<JournalEntryType[]>([]);

    const [dbJournals, loading, error] = useCollection(firebase.firestore().collection('journal'));
    useEffect(() => {
        if (!loading) {
            var tempJournals = [];
            dbJournals.docs.map((doc) => {
                const { id, date, text } = doc.data();
                const journalEntry: JournalEntryType = {
                    id, date, text
                };
                tempJournals.push(journalEntry);
            });
            setJournals(tempJournals);
        }
    }, [loading, dbJournals]);
    
    return {journals, loading, error};
}