import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'; 
import { themeColor } from '../constants/Colors';
import { Text, View, Card, Separator } from '../components/Themed';
import { ScrollView } from 'react-native'; 
import { CheckBox } from 'react-native-elements'; 
import { CheckBoxType } from '../types'; 
import firebase from '../firebase'; 
import '@firebase/firestore'

import { getDateString } from '../utils'; 

const dataRemaining = {
  "remaining": 
    [
      { id: 1, title: 'box 1', checked: false },
      { id: 2, title: 'box 2', checked: false },
      { id: 3, title: 'box 3', checked: false },
      { id: 4, title: 'box 4', checked: false },
    ], 
    "finished": [
      { id: 5, title: 'box 5', checked: true },
      { id: 6, title: 'box 6', checked: true },
      { id: 7, title: 'box 7', checked: true },
      { id: 8, title: 'box 8', checked: true },
    ]
}

export default function HabitsScreen() {
  const [currentDate, setCurrentDate] = useState('');
  const [remainingHabits, setRemainingHabits] = useState<CheckBoxType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<CheckBoxType[]>([]); 

  useEffect(() => {
    async function test() {
      firebase.firestore().collection('test').add({ 'hello': 'asdf' })
    }
    // const db = firebase.database().ref('data'); 
    // db.push().set('test'); 
    // setCurrentDate(getDateString()); 

    // setRemainingHabits(dataRemaining['remaining']); 

    // setFinishedHabits(dataRemaining['finished']); 
    test()
  }, [])

  function changeHabitCheckedStatus(id: number, checked: boolean) {
    console.log('ere', id, checked)
    if (!checked) {
      console.log('data', dataRemaining['remaining'][id])
    } else {
      dataRemaining['finished'][id]; 
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.date, { color: themeColor }]}>{currentDate}</Text>
      <Text style={styles.title}>Remaining</Text>
      <ScrollView style={styles.scrollList}>
        { remainingHabits.map((habit) => {
          return <CheckBox
                    key={habit.id}
                    checked={habit.checked}
                    checkedTitle={habit.title}
                    title={habit.title}
                    onPress={() => changeHabitCheckedStatus(habit.id, habit.checked)}
                  />
        })}
      </ScrollView>

      <Separator style={styles.separator} />

      <Text style={styles.title}>Finished</Text>
      <ScrollView style={styles.scrollList}>
        { finishedHabits.map((habit) => {
          return <CheckBox
                    key={habit.id}
                    checked={habit.checked}
                    checkedTitle={habit.title}
                    title={habit.title}
                  />
        })}
      </ScrollView>
      <Card>
        <Text>hellomoto</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15, 
    fontWeight: 'bold'
  },
  separator: {
    borderColor: 'red', 
    marginVertical: 0,
    height: 1,
    width: '80%',
  }, 
  scrollList: {
    width: '100%', 
  }
});
