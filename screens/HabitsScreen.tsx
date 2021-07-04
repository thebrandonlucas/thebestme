import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { connect } from 'react-redux';
import ThemeButton from '../components/ThemeButton';
import { Card, CheckBox, Input, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import firebase from '../firebase';
import { useHabits } from '../hooks/useHabits';
import getDateString from '../utils';

const db = firebase.firestore();

export default function HabitsScreen() {
  const [currentDate, setCurrentDate] = useState('');
  const [addingHabit, setAddingHabit] = useState(false);
  const [habitText, setHabitText] = useState<string>('');
  const [remainingHabits, finishedHabits, loading, error] = useHabits();
  const colorScheme = useColorScheme();
  const inputRef = useRef(null);

  // FIXME: should useLayoutEffect be used for DOM manipulation?
  useEffect(() => {
    setCurrentDate(getDateString().date);
    if (addingHabit) {
      // inputRef.current.focus();
    }
  }, []);

  /**
   * Toggle the habit "checked" status
   * @param {string} id - The habit id
   * @param {boolean} checked - The new status
   * @return {void}
   */
  function toggleHabit(id: string, checked: boolean): void {
    // TODO: make all refs (i.e. 'habits' here) variables
    db.collection('habits').doc(id).update({ checked: !checked });
  }

  /**
   * Click handler for the "Add" button
   * @return {void}
   */
  function clickPlus(): void {
    setAddingHabit(true);
  }

  /**
   * Click handler for adding a new habit
   * @return {void}
   */
  function clickCheck(): void {
    addHabit();
    setAddingHabit(false);
  }

  /**
   * Click handler for the "Close" button
   * @return {void}
   */
  function clickClose(): void {
    setAddingHabit(false);
  }

  /**
   * Add a new habit
   * @return {void}
   */
  function addHabit(): void {
    if (habitText.length === 0) {
      return;
    }
    const habit = {
      text: habitText,
      checked: false,
    };

    db.collection('habits').add(habit);
    setAddingHabit(false);
    setHabitText('');
  }

  return (
    <View style={styles.container}>
      {/* <Text>Welcome, {props.user.username}</Text> */}
      <View style={styles.headerContainer}>
        {!addingHabit ? (
          <>
            <Text style={[styles.date, { color: Colors.themeColor }]}>
              {currentDate}
            </Text>
            <TouchableOpacity style={styles.plusIcon} onPress={clickPlus}>
              <AntDesign name="plus" size={24} color={Colors.themeColor} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Input
              // ref={inputRef}
              containerStyle={styles.addHabitInputContainer}
              // inputContainerStyle={{borderColor: 'green', borderWidth: 1, paddingHorizontal: 0, paddingVertical: 0, marginVertical: 0,}}
              placeholder="Add a habit"
              onChangeText={setHabitText}
              value={habitText}
            />
            <View style={styles.addHabitIconContainer}>
              <TouchableOpacity
                style={[styles.date, styles.closeIcon]}
                onPress={clickClose}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color={Colors[colorScheme].mutedText}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.date, styles.checkIcon]}
                onPress={clickCheck}
              >
                <AntDesign name="check" size={24} color={Colors.themeColor} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={styles.cardContainer}>
        {!loading ? (
          <>
            <Card style={[styles.card, { marginBottom: 10 }]}>
              <Text style={styles.title}>Remaining</Text>
              <ScrollView style={styles.scrollList}>
                {remainingHabits.length ? (
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
                ) : (
                  <Text>You've completed all your habits today! Hooray!</Text>
                )}
              </ScrollView>
            </Card>
            <Card style={styles.card}>
              <Text style={styles.title}>Finished</Text>
              <ScrollView style={styles.scrollList}>
                {finishedHabits.length ? (
                  <>
                    {finishedHabits.map((habit) => (
                      <CheckBox
                        key={habit.id}
                        checked={habit.checked}
                        checkedTitle={habit.text}
                        title={habit.text}
                        onPress={() => toggleHabit(habit.id, habit.checked)}
                      />
                    ))}
                  </>
                ) : (
                  <Text>When you've finished a habit, bring it on down!</Text>
                )}
              </ScrollView>
            </Card>
            <View style={styles.buttonContainer}>
              <ThemeButton
                title="Finish Day"
                onPress={() => console.log('Implement')}
                testID="finishDay"
              />
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" color={Colors.themeColor} />
        )}
      </View>
      {error && <Text>{JSON.stringify(error)}</Text>}
    </View>
  );
}

const mapStateToProps = (state) => {
  // console.log('state',state)
  const { user } = state;
  return user;
};

connect(mapStateToProps)(HabitsScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
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
  addHabitInputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addHabitIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 15,
    fontWeight: 'bold',
    aspectRatio: 1,
    // TODO: find better, more dynamic way to pad (using aspectRatio perhaps?)
    padding: 10,
  },
  closeIcon: {
    aspectRatio: 1 / 2,
  },
  checkIcon: {
    aspectRatio: 1 / 2,
  },
  scrollList: {
    width: '100%',
    aspectRatio: 5 / 3,
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 15 / 20,
  },
  addHabitInput: {
    width: '80%',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 9 / 1,
  },
  card: {
    margin: 0,
  },
});
