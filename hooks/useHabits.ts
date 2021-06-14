import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { HabitType } from '../types';


const db = firebase.firestore();
/** 
 * hook to get habits from firebase
 * @param {number} userId - ID of currently logged in user
 * @param {boolean} isRemaining - Bool for whether to get remaining habits or finshed habits.
 * @return {null}
 */
// TODO: implement user id
export function useHabits(userId: number, isRemaining: boolean) {
    const [habits, setHabits] = useState<HabitType[]>([]);

    useEffect(() => {
        const collectionName = isRemaining ? 'remaining' : 'finished';
        db.collection(collectionName).onSnapshot((snapshot) => {
            const newHabits = [];
            snapshot.docs.map((doc) => {
                let habit;
                habit = doc.data();
                habit.id = doc.id;
                console.log('id', doc.id)
                newHabits.push(habit);
            });
            setHabits(newHabits);
        });
    }, []);
    return habits;
}