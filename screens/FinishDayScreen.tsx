import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { saveDay } from '../redux/actions/DayActions';
import { resetHabits } from '../redux/actions/HabitsActions';
import { DayType, HabitType, IDayType, IHabitType } from '../types';

function FinishDayScreen({ navigation, dayReducer, habitReducer, saveDay }) {
  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [habitCount, setHabitCount] = useState<number>(0);
  const [habitPercentComplete, setHabitPercentComplete] = useState<number>(0);
  const [endOfDayNotes, setEndOfDayNotes] = useState<string>('');
  const [todayDate, setTodayDate] = useState(DateTime.now().toISODate());
  const [finishedHabitCount, setFinishedHabitCount] = useState(0);

  const [journalEntryCount, setJournalEntryCount] = useState(0);
  const [cbtEntryCount, setCbtEntryCount] = useState(0);
  const [awareEntryCount, setAwareEntryCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const { habits } = habitReducer;
    const { today } = dayReducer;
    const tempRemainingHabits: HabitType[] = [];
    const tempFinishedHabits: HabitType[] = [];
    for (let i = 0; i < today.habitIds.length; i++) {
      const id = today.habitIds[i];
      if (habits[id].checked) {
        tempFinishedHabits.push(habits[id]);
      } else {
        tempRemainingHabits.push(habits[id]);
      }
    }
    const tempHabitCount =
      tempRemainingHabits.length + tempFinishedHabits.length;
    setHabitCount(tempHabitCount);
    setFinishedHabitCount(tempFinishedHabits.length);
    const percentComplete = 100 * (tempFinishedHabits.length / tempHabitCount);
    // Round percent complete to two decimal places
    // @see https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places (comment by Marquizzo)
    setHabitPercentComplete(Math.round(percentComplete * 100) / 100);
    setRemainingHabits(tempRemainingHabits);
    setFinishedHabits(tempFinishedHabits);

    setJournalEntryCount(today.journalIds.length);
    setCbtEntryCount(today.cbtIds.length);
    setAwareEntryCount(today.awareIds.length);
  }, [dayReducer, habitReducer]);

  function finishDay(mood: string) {
    const date = DateTime.now().toISODate();
    const remainingHabitIds: string[] = remainingHabits.map(
      (habit) => habit.id
    );
    const finishedHabitIds: string[] = finishedHabits.map((habit) => habit.id);
    const habitIds: string[] = [...remainingHabitIds, ...finishedHabitIds];

    const currentDayInfo: DayType = dayReducer.days[date];
    const dayInfo: IDayType = {
      [date]: {
        ...dayReducer.today,
        date,
        habitIds,
        finishedHabitCount,
        habitCount,
        habitPercentComplete,
        mood: currentDayInfo ? [...currentDayInfo.mood, mood] : [mood],
        endOfDayNotes:
          currentDayInfo && endOfDayNotes
            ? [...currentDayInfo.endOfDayNotes, endOfDayNotes]
            : currentDayInfo
            ? currentDayInfo.endOfDayNotes
            : [],
      },
    };
    console.log('dayinfo', dayInfo);
    saveDay(dayInfo);
    dispatch(resetHabits());
    navigation.navigate('Data');
  }

  return (
    <View style={styles.container}>
      <TextInputModal
        text={endOfDayNotes}
        setText={setEndOfDayNotes}
        label="End of Day Notes"
        buttonStyle={styles.endOfDayNotes as StyleProp<ViewStyle>}
      />
      <HabitSummaryCard
        remainingHabits={remainingHabits}
        finishedHabits={finishedHabits}
        habitCount={habitCount}
        habitPercentComplete={habitPercentComplete}
      />
      <Card>
        <Text style={styles.title}>Journals</Text>
        <View style={[styles.rowContainer, { marginVertical: 5 }]}>
          <Text style={styles.bold}>Primary: {journalEntryCount}</Text>
          <Text style={styles.bold}>CBT: {cbtEntryCount}</Text>
          <Text style={styles.bold}>AWARE: {awareEntryCount}</Text>
        </View>
      </Card>
      <Text style={styles.title}>How are you feeling?</Text>
      <View style={styles.rowContainer}>
        <ThemeButton
          title="Great"
          color={Colors.happyGreen}
          onPress={() => finishDay('Great')}
          buttonStyle={styles.button as StyleProp<ViewProps>}
          containerStyle={styles.buttonContainerStyle as StyleProp<ViewProps>}
        />
        <ThemeButton
          title="Good"
          color={Colors.neutralYellow}
          onPress={() => finishDay('Okay')}
          buttonStyle={styles.button as StyleProp<ViewProps>}
          containerStyle={styles.buttonContainerStyle as StyleProp<ViewProps>}
        />
        <ThemeButton
          title="Not Great"
          color={Colors.sadRed}
          onPress={() => finishDay('Not Good')}
          buttonStyle={styles.button as StyleProp<ViewProps>}
          containerStyle={styles.buttonContainerStyle as StyleProp<ViewProps>}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state: {
  dayReducer: { today: DayType; days: IDayType };
  habitReducer: { habits: IHabitType };
}) => {
  const { habitReducer, dayReducer } = state;
  return { dayReducer, habitReducer };
};
const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: IDayType }) => void
) => ({
  saveDay: (dayInfo: IDayType) => {
    dispatch(saveDay(dayInfo));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(FinishDayScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    width: '100%',
  },
  rowContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {},
  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  endOfDayNotes: {
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
});
