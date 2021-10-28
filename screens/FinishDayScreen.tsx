import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { saveDay } from '../redux/actions/DayActions';
import { DayType, HabitType } from '../types';

function FinishDayScreen({ route, navigation, dayReducer, habitReducer, saveDay }) {
  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [habitCount, setHabitCount] = useState<number>(0);
  const [habitPercentComplete, setHabitPercentComplete] = useState<number>(0);
  const [endOfDayNotes, setEndOfDayNotes] = useState<string>('');

  useEffect(() => {
    const { habits } = habitReducer, { today } = dayReducer;
    let tempRemainingHabits = [], tempFinishedHabits = [];
    for (let i = 0; i < today.habitIds.length; i++) {
      const id = today.habitIds[i];
      if (habits[id].checked) {
        tempFinishedHabits.push(habits[id])
      } else {
        tempRemainingHabits.push(habits[id]);
      }
    }
    // console.log('tempfin', tempFinishedHabits)
    const tempHabitCount =
      tempRemainingHabits.length + tempFinishedHabits.length;
    setHabitCount(tempHabitCount);
    const percentComplete = 100 * (tempFinishedHabits.length / tempHabitCount);
    // Round percent complete to two decimal places
    // @see https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places (comment by Marquizzo)
    setHabitPercentComplete(Math.round(percentComplete * 100) / 100);
    setRemainingHabits(tempRemainingHabits);
    setFinishedHabits(tempFinishedHabits);
  }, [dayReducer, habitReducer]);

  function finishDay(mood: string) {
    const date = DateTime.now().toISODate();
    const finishedHabitIds = finishedHabits.map(habit => habit.id);
    const remainingHabitIds = remainingHabits.map(habit => habit.id);

    const dayInfo = {
      [date]: {
        ...dayReducer.today,
        // TODO: Figure out when to set date
        date,
        finishedHabitIds,
        remainingHabitIds,
        habitCount,
        habitPercentComplete,
        mood: dayReducer.days[date] ? [...dayReducer.days[date].mood, mood] : [mood],
        endOfDayNotes: dayReducer.days[date]
          ? [...dayReducer.today.endOfDayNotes, endOfDayNotes]
          : [endOfDayNotes],
      },
    };
    saveDay(dayInfo);
    navigation.navigate('HabitsScreen');
  }

  const HabitCard = ({ title, habits }) => {
    return (
      <>
        <Text>{title}</Text>
        <Card>
          {habits.map(
            (habit: {
              id: React.Key;
              text:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
            }) => {
              return <Text key={habit.id}>{habit.text}</Text>;
            }
          )}
        </Card>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Summary</Text>
      <Card>
        <Text>
          Completed: {finishedHabits.length} / {habitCount}
        </Text>
        <Text>% Complete: {habitPercentComplete}</Text>
      </Card>
      <HabitCard title="Remaining" habits={remainingHabits} />
      <HabitCard title="Finished" habits={finishedHabits} />
      <TextInputModal
        text={endOfDayNotes}
        setText={setEndOfDayNotes}
        label="End of Day Notes"
      />
      <ThemeButton
        title="Happy"
        color={Colors.happyGreen}
        onPress={() => finishDay('Happy')}
        testID="happyBtn"
      />
      <ThemeButton
        title="Neutral"
        color={Colors.neutralYellow}
        onPress={() => finishDay('Neutral')}
        testID="neutralBtn"
      />
      <ThemeButton
        title="Sad"
        color={Colors.sadRed}
        onPress={() => finishDay('Sad')}
        testID="sadBtn"
      />
    </View>
  );
}

const mapStateToProps = (state: {
  dayReducer: { today: any; days: any };
  habitReducer: { habits: {} };
}) => {
  const { habitReducer, dayReducer } = state;
  return { dayReducer, habitReducer };
};
const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: DayType }) => void
) => {
  return {
    saveDay: (dayInfo: DayType) => {
      dispatch(saveDay(dayInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FinishDayScreen);

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
