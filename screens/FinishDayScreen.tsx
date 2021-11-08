import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { connect } from 'react-redux';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { saveDay } from '../redux/actions/DayActions';
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

  useEffect(() => {
    const habits: IHabitType = habitReducer.habits,
      today: DayType = dayReducer.today;
    let tempRemainingHabits: HabitType[] = [],
      tempFinishedHabits: HabitType[] = [];
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

    const dayInfo: IDayType = {
      [date]: {
        ...dayReducer.today,
        // TODO: Figure out when to set date
        date,
        habitIds,
        finishedHabitCount,
        habitCount,
        habitPercentComplete,
        mood: dayReducer.days[date]
          ? [...dayReducer.days[date].mood, mood]
          : [mood],
        endOfDayNotes: dayReducer.days[date]
          ? [...dayReducer.today.endOfDayNotes, endOfDayNotes]
          : [endOfDayNotes],
      },
    };
    saveDay(dayInfo);
    navigation.navigate('HabitsScreen');
  }

  const HabitCard = ({ habits }) => {
    return (
      <>
        <ScrollView style={styles.habitScroll}>
          {habits.map((habit: { id: React.Key; text: string }) => {
            // \u2022 is unicode for 'bullet' character
            return (
              <Text
                style={styles.bulletHabit}
                key={habit.id}
              >{`\u2022${habit.text}`}</Text>
            );
          })}
        </ScrollView>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TextInputModal
        text={endOfDayNotes}
        setText={setEndOfDayNotes}
        label="End of Day Notes"
        buttonStyle={styles.endOfDayNotes as StyleProp<ViewStyle>}
      />
      <Card style={styles.habitCard}>
        <Text style={styles.title}>Habits</Text>
        <View style={styles.textRow}>
          <Text style={styles.bold}>
            Completed: {finishedHabits.length} / {habitCount}
          </Text>
          <Text style={styles.bold}>
            Percent Complete: {habitPercentComplete}%
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.bold}>Remaining</Text>
          <Text style={styles.bold}>Finished</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.rowContainer}>
          <HabitCard habits={remainingHabits} />
          <HabitCard habits={finishedHabits} />
        </View>
      </Card>
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
          title="Happy"
          color={Colors.happyGreen}
          onPress={() => finishDay('Happy')}
          testID="happyBtn"
          buttonStyle={styles.button as StyleProp<ViewProps>}
          containerStyle={styles.buttonContainerStyle as StyleProp<ViewProps>}
        />
        <ThemeButton
          title="Neutral"
          color={Colors.neutralYellow}
          onPress={() => finishDay('Neutral')}
          testID="neutralBtn"
          buttonStyle={styles.button as StyleProp<ViewProps>}
          containerStyle={styles.buttonContainerStyle as StyleProp<ViewProps>}
        />
        <ThemeButton
          title="Sad"
          color={Colors.sadRed}
          onPress={() => finishDay('Sad')}
          testID="sadBtn"
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
) => {
  return {
    saveDay: (dayInfo: IDayType) => {
      dispatch(saveDay(dayInfo));
    },
  };
};
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
  bulletHabit: {
    marginVertical: 5,
  },
  button: {},
  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 5,
  },
  habitCard: {
    aspectRatio: 6 / 5,
  },
  habitScroll: {
    aspectRatio: 1,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '90%',
    backgroundColor: Colors.dark.mutedText,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  endOfDayNotes: {
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
});
