import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ThemeButton from '../components/ThemeButton';
import { Card, CheckBox, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import firebase from '../firebase';
import { CheckBoxType, HabitType } from '../types';
import getDateString from '../utils';
import { useHabits } from '../hooks/useHabits';
import { connect } from 'react-redux';




const db = firebase.firestore();

function HabitsScreen(props) {
  const [currentDate, setCurrentDate] = useState('');
  const [checked, setChecked] = useState(false);
  // const [remainingHabits, setRemainingHabits] = useState<CheckBoxType[]>([]);
  // const [finishedHabits, setFinishedHabits] = useState<CheckBoxType[]>([]);

  // TODO: reverse logic for true/false
  // FIXME: is using the useeffect hook like this 
  // the most effecient way to use it? Does it waste any reads?
  // const [remainingHabits, loading, error] = useCollection(firebase.firestore().collection('remaining'));

  const [remainingHabits, finishedHabits, loading, error] = useHabits();

  useEffect(() => {
    setCurrentDate(getDateString().date);
    console.log(remainingHabits)
  }, []);


  /** 
  * Brief description of the function here.
  * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
  * @param {string} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
  * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
  */
  function toggleHabit(id: string, checked: boolean): void {
    // TODO: make all refs (i.e. 'habits' here) variables
    db.collection('habits').doc(id).update({ checked: !checked });
  }

  return (
    <View style={styles.container}>
      {/* <Text>Welcome, {props.user.username}</Text> */}
      <Text style={[styles.date, { color: Colors.themeColor }]}>
        {currentDate}
      </Text>
      {
        !loading ? 
        <View style={styles.cardContainer}>
          <Card style={[styles.card, { marginBottom: 10 }]}>
            <Text style={styles.title}>Remaining</Text>
            <ScrollView style={styles.scrollList}>
                {remainingHabits.length ? 
               <>
                {remainingHabits.map((habit) => (
                                  <CheckBox
                                    key={habit.id}
                                    checked={habit.checked}
                                    checkedTitle={habit.text}
                                    title={habit.text}
                                    onPress={() => toggleHabit(habit.id, habit.checked)}
                                  />
                                ))}
               </>
                  

                  :
                <Text>You've completed all your habits today! Hooray!</Text>
                  
                }
                </ScrollView>
              
          </Card>
          <Card style={styles.card}>
            <Text style={styles.title}>Finished</Text>
            <ScrollView style={styles.scrollList}>
              {finishedHabits.map((habit) => (
                <CheckBox
                  key={habit.id}
                  checked={habit.checked}
                  checkedTitle={habit.text}
                  title={habit.text}
                  onPress={() => toggleHabit(habit.id, habit.checked)}
                />
              ))}
            </ScrollView>
          </Card>
        </View>
        :
        // TODO: impl spinner
        <Text>Loading...</Text>
      }
      { error && 
        <Text>{JSON.stringify(error)}</Text>
      }
      <View style={styles.buttonContainer}>
        <ThemeButton
          title="New Habit"
          onPress={() => console.log('Implement')}
          testID="newHabit"
        />
        <ThemeButton
          title="Finish Day"
          onPress={() => console.log('Implement')}
          testID="finishDay"
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  // console.log('state',state)
  const { user } = state;
  return user;
}

export default connect(mapStateToProps)(HabitsScreen);

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
