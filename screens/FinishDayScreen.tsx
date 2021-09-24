import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { saveDayToStorage, saveFinishDayCountToStorage } from '../redux/actions/DayActions';
import ThemeButton from '../components/ThemeButton';
import { Card, Input, Text, View } from '../components/Themed';
import { Collections } from '../constants';
import Colors from '../constants/Colors';
import firebase from '../firebase';
import { HabitType } from '../types';

const db = firebase.firestore();

export function FinishDayScreen({ route, navigation, day, finishDayCount }) {
  const dispatch = useDispatch();
  //   FIXME: should remainingHabits and finishedHabits be state vars? How often do they render?
  const daysCollection = db.collection(Collections.days);

  const remainingHabits: HabitType[] = route.params.remainingHabits;
  const finishedHabits: HabitType[] = route.params.finishedHabits;
  const [totalHabitCount, setTotalHabitCount] = useState<number>(0);
  const [habitPercentComplete, setHabitPercentComplete] = useState<number>(0);
  const [endOfDayNotes, setEndOfDayNotes] = useState<string>('');

  useEffect(() => {
    const habitCount = remainingHabits.length + finishedHabits.length;
    setTotalHabitCount(habitCount);
    const percentComplete = 100 * (finishedHabits.length / habitCount);
    // Round percent complete to two decimal places
    // @see https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places (comment by Marquizzo)
    setHabitPercentComplete(Math.round(percentComplete * 100) / 100);
  }, [day, finishDayCount]);

  function finishDay(mood: string) {
    // NOTE: AsyncStorage doesn't support the Set() type, must convert to array on upload
    const remainingHabitIds = [...day.remainingHabitIds];
    const finishedHabitIds = [...day.finishedHabitIds];
    const date = new Date().toISOString();
    const dayInfo = {
      ...day,
      // TODO: Figure out when to set date
      date,
      remainingHabitIds,
      finishedHabitIds,
      mood,
      endOfDayNotes,
      isDayFinished: true,
    };
    const tempFinishDayCount = finishDayCount + 1;
    dispatch(saveDayToStorage(dayInfo, tempFinishDayCount));
    dispatch(saveFinishDayCountToStorage(date, tempFinishDayCount));
  }

  return (
    <View style={styles.container}>
      <Text>Summary</Text>
      <Card>
        <Text>
          Completed: {finishedHabits.length} / {totalHabitCount}
        </Text>
        <Text>% Complete: {habitPercentComplete}</Text>
      </Card>
      <Text>Remaining</Text>
      <Card>
        {remainingHabits.map((habit) => {
          return <Text>{habit.text}</Text>;
        })}
      </Card>
      <Text>Finished</Text>
      <Card>
        {finishedHabits.map((habit) => {
          return <Text>{habit.text}</Text>;
        })}
      </Card>
      <Text>End of day notes</Text>
      <Input
        containerStyle={styles.addHabitInputContainer}
        placeholder="What are your thoughts about today?"
        onChangeText={setEndOfDayNotes}
        value={endOfDayNotes}
      />
      <ThemeButton
        title="Happy"
        color={Colors.happyGreen}
        onPress={() => finishDay('H')}
        testID="happyBtn"
      />
      <ThemeButton
        title="Neutral"
        color={Colors.neutralYellow}
        onPress={() => finishDay('N')}
        testID="neutralBtn"
      />
      <ThemeButton
        title="Sad"
        color={Colors.sadRed}
        onPress={() => finishDay('S')}
        testID="sadBtn"
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { user, day, finishDayCount } = state;
  return { user, day };
};
export default connect(mapStateToProps)(FinishDayScreen);

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
});
