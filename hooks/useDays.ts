import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Collections } from '../constants';
import { DayType } from '../types';

const db = firebase.firestore();
/** 
 * hook to get habits from firebase
 */
// TODO: implement user id
export function useHabits() {
    const [days, setDays] = useState<DayType[]>([]);
    const [dbDays, loading, error] = useCollection(firebase.firestore().collection(Collections.days));

    useEffect(() => {
        if (!loading) {
            let tempDays = [];
            dbDays.docs.map((doc) => {
                const { date, finishedHabitIds, remainingHabitIds, cbtIds, awareIds, journalIds, mood, endOfDayNotes, isDayFinished } = doc.data();
                const day: DayType = {
                    id: doc.id,
                    date,
                    finishedHabitIds,
                    remainingHabitIds,
                    cbtIds,
                    awareIds,
                    journalIds,
                    mood,
                    endOfDayNotes,
                    isDayFinished,
                };
                tempDays.push(day);
            });
            setDays(tempDays);
        }
        
    }, [loading, dbDays])
    return {days, loading, error};
}