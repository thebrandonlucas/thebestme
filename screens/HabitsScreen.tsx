import '@firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ThemeButton from '../components/ThemeButton';
import { Card, CheckBox, Text, View } from '../components/Themed';
import { themeColor } from '../constants/Colors';
import firebase from '../firebase';
import { CheckBoxType } from '../types';
import { getDateString } from '../utils';

const dataRemaining = {
  remaining: [
    { id: 1, title: 'box 1', checked: false },
    { id: 2, title: 'box 2', checked: false },
    { id: 3, title: 'box 3', checked: false },
    { id: 4, title: 'box 4', checked: false },
  ],
  finished: [
    { id: 5, title: 'box 5', checked: true },
    { id: 6, title: 'box 6', checked: true },
    { id: 7, title: 'box 7', checked: true },
    { id: 8, title: 'box 8', checked: true },
    { id: 9, title: 'box 5', checked: true },
    { id: 10, title: 'box 6', checked: true },
    { id: 11, title: 'box 7', checked: true },
    { id: 12, title: 'box 8', checked: true },
  ],
};

export default function HabitsScreen() {
  const [currentDate, setCurrentDate] = useState('');
  const [remainingHabits, setRemainingHabits] = useState<CheckBoxType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<CheckBoxType[]>([]);
  const [habits, setHabits] = useState<string[]>([]);

  const db = firebase.firestore();
  const habitsRef = db.collection('Habits');
  const daysRef = db.collection('Days');

  useEffect(() => {
    setCurrentDate(getDateString().date);
    setRemainingHabits(dataRemaining.remaining);

    setFinishedHabits(dataRemaining.finished);
  }, []);

  async function getHabits() {
    return await firebase.firestore().collection('Habits');
  }

  async function getRemainingHabits() {
    return await firebase.firestore().collection('remainingHabits');
  }

  async function getFinishedHabits() {
    return await firebase.firestore().collection('finishedHabits');
  }

  function changeHabitCheckedStatus(id: number, checked: boolean) {
    console.log('ere', id, checked);
    if (!checked) {
      console.log('data', dataRemaining.remaining[id]);
    } else {
      dataRemaining.finished[id];
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.date, { color: themeColor }]}>{currentDate}</Text>
      <View style={styles.cardContainer}>
        <Card style={[styles.card, { marginBottom: 10 }]}>
          <Text style={styles.title}>Remaining</Text>
          <ScrollView style={styles.scrollList}>
            {remainingHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                checked={habit.checked}
                checkedTitle={habit.title}
                title={habit.title}
                onPress={() =>
                  changeHabitCheckedStatus(habit.id, habit.checked)
                }
              />
            ))}
          </ScrollView>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.title}>Finished</Text>
          <ScrollView style={styles.scrollList}>
            {finishedHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                checked={habit.checked}
                checkedTitle={habit.title}
                title={habit.title}
              />
            ))}
          </ScrollView>
        </Card>
      </View>
      <View style={styles.buttonContainer}>
        <ThemeButton title="New Habit" />
        <ThemeButton title="Finish Day" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  scrollList: {
    width: '100%',
    aspectRatio: 2 / 1,
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 5 / 6,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 7 / 2,
  },
  card: {
    margin: 0,
  },
});
