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
import { getDateFromISOString } from '../utils';

function FinishDayScreen({ route, navigation, today, days, habits, saveDay }) {
  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [habitCount, setHabitCount] = useState<number>(0);
  const [habitPercentComplete, setHabitPercentComplete] = useState<number>(0);
  const [endOfDayNotes, setEndOfDayNotes] = useState<string>('');

  useEffect(() => {
    const tempRemainingHabits = today.remainingHabitIds.map((id) => habits[id]);
    const tempFinishedHabits = today.finishedHabitIds.map((id) => habits[id]);
    const tempHabitCount =
      tempRemainingHabits.length + tempFinishedHabits.length;
    setHabitCount(tempHabitCount);
    const percentComplete = 100 * (tempFinishedHabits.length / tempHabitCount);
    // Round percent complete to two decimal places
    // @see https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places (comment by Marquizzo)
    setHabitPercentComplete(Math.round(percentComplete * 100) / 100);
    setRemainingHabits(tempRemainingHabits);
    setFinishedHabits(tempFinishedHabits);
  }, [today, days]);

  function finishDay(mood: string) {
    const date = getDateFromISOString(new Date().toISOString());
    const finishedHabitIds = today.finishedHabitIds;
    const remainingHabitIds = today.remainingHabitIds;

    const dayInfo = {
      [date]: {
        ...today,
        // TODO: Figure out when to set date
        date,
        finishedHabitIds,
        remainingHabitIds,
        habitCount,
        habitPercentComplete,
        mood: days[date] ? [...days[date].mood, mood] : [mood],
        endOfDayNotes: days[date]
          ? [...today.endOfDayNotes, endOfDayNotes]
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
  const { today, days } = state.dayReducer;
  const { habits } = state.habitReducer;
  return { today, days, habits };
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
