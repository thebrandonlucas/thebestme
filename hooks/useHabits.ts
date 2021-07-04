import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { HabitType } from '../types';
import { useCollection } from 'react-firebase-hooks/firestore';


const db = firebase.firestore();
/** 
 * hook to get habits from firebase
 */
// TODO: implement user id
export function useHabits() {
    const [remainingHabits, setRemainingHabits] = useState<any[]>([]);
    const [finishedHabits, setFinishedHabits] = useState<any[]>([]);

    const [habits, loading, error] = useCollection(firebase.firestore().collection('habits'));

    useEffect(() => {
        if (!loading) {
            
            const remaining = [], finished = [];
            habits.docs.map((doc) => {
                const habit = {
                    id: doc.id,
                    ...doc.data()
                };
                if (habit.checked) {
                    finished.push(habit)
                } else {
                    remaining.push(habit)
                }
            });
            setRemainingHabits(remaining);
            setFinishedHabits(finished);
        }
        
    }, [loading, habits]);
    
    return [remainingHabits, finishedHabits, loading, error];
}