import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { saveDay, setDayInfo } from '../redux/actions/DayActions';
import { DayType, HabitType } from '../types';
import { getDateFromISOString } from '../utils';

function FinishDayScreen({ route, navigation, today, saveDay }) {
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
  }, [today]);

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
        mood: [...today.mood, mood],
        endOfDayNotes: [...today.endOfDayNotes, endOfDayNotes],
      }
    };
    setDayInfo(dayInfo);
    saveDay();
    navigation.navigate('HabitsScreen');
  }

  const HabitCard = ({ title, habits }) => {
    return (
      <>
        <Text>{title}</Text>
        <Card>
          {habits.map((habit: { id: React.Key; text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) => {
            return <Text key={habit.id}>{habit.text}</Text>;
          })}
        </Card>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Summary</Text>
      <Card>
        <Text>
          Completed: {finishedHabits.length} / {totalHabitCount}
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

const mapStateToProps = (state: { dayReducer: { today: any; }; }) => {
  const { today } = state.dayReducer;
  return { today };
};
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: DayType; }) => void) => {
  return {
    saveDay: () => {
      dispatch(saveDay());
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
