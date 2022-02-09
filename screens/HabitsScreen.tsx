import { AntDesign } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
// NOTE: Required import for uuid to work
import 'react-native-get-random-values';
import { connect, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import HabitContainer from '../components/HabitContainer';
import ThemeButton from '../components/ThemeButton';
import { Card, Input, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { setDayInfo } from '../redux/actions/DayActions';
import {
  addHabit,
  deleteHabit,
  toggleHabit,
  updateHabit,
} from '../redux/actions/HabitsActions';
import { RootState } from '../redux/store';
import { DayType, HabitType, IDayType, IHabitType } from '../types';
import getDateString from '../utils';

export function HabitsScreen({
  habitReducer,
  dayReducer,
  error,
  navigation,
  addHabit,
  deleteHabit,
  toggleHabit,
  updateHabit,
  setDayInfo,
}) {
  const [currentDate, setCurrentDate] = useState('');
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [isEditingHabit, setIsEditingHabit] = useState(false);
  const [habitId, setHabitId] = useState<string>('');
  const [habitText, setHabitText] = useState<string>('');
  const [habitChecked, setHabitChecked] = useState<boolean>(false);
  const [remainingHabits, setRemainingHabits] = useState<Array<HabitType>>([]);
  const [finishedHabits, setFinishedHabits] = useState<Array<HabitType>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const colorScheme = useColorScheme();
  const inputRef = useRef(null);

  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );
  const today = useSelector<RootState, IDayType>(
    (state) => state.dayReducer
  );
  
  // FIXME: should useLayoutEffect be used for DOM manipulation (i.e. inputRef)?
  useEffect(() => {
    console.log('today', today)

    setCurrentDate(getDateString(new Date().toISOString()).date);
    if (isAddingHabit || isEditingHabit) {
      inputRef.current.focus();
    }
    let tempRemainingHabits = [],
      tempFinishedHabits = [];
    for (const key in habits) {
      const currentHabit = habits[key];
      if (!currentHabit.deleted) {
        if (!currentHabit.checked) {
          tempRemainingHabits.push(currentHabit);
        } else {
          tempFinishedHabits.push(currentHabit);
        }
      }
    }
    setRemainingHabits(tempRemainingHabits);
    setFinishedHabits(tempFinishedHabits);
    setLoading(false);
    // TODO: figure out how to use useSelector to update state.
    // right now, putting habits in there doesn't update state
  }, [isAddingHabit, isEditingHabit, habitReducer, dayReducer, today]);

  /**
   * Toggle the habit "checked" status
   * @param {string} id - The habit uuid
   * @param {boolean} checked - The new status
   * @return {void}
   */
  function clickToggle(id: string, checked: boolean): void {
    toggleHabit(id, checked);
    setHabitChecked(checked);
  }

  /**
   * Click handler for the "Add" button
   * @return {void}
   */
  function clickPlus(): void {
    setIsAddingHabit(true);
  }

  /**
   * Click handler for adding a new habit
   * @return {void}
   */
  function clickCheck(): void {
    if (habitText.length === 0) {
      return;
    }

    if (isAddingHabit) {
      const id = uuidv4();
      const habit: IHabitType = {
        [id]: {
          id,
          text: habitText,
          checked: false,
          deleted: false,
        },
      };
      addHabit(habit);
      const tempHabitIds: string[] = [
        ...today.finishedHabitIds,
        ...today.remainingHabitIds,
        id,
      ];
      setDayInfo({ ...today, habitIds: tempHabitIds });
      setIsAddingHabit(false);
      setHabitText('');
      setHabitChecked(false);
    } else {
      // TODO: make all habit ids one property in day object
      // Replace habit id in array
      // let tempRemainingHabitIds =
      updateHabit(habitId, habitText);
      setIsEditingHabit(false);
      setHabitText('');
    }
  }

  /**
   * Click handler for the "Close" button
   * @return {void}
   */
  function clickClose(): void {
    setIsAddingHabit(false);
  }

  /**
   * Click handler for the "Edit" icon
   * @param {string} id - The habit id
   * @param {string} text - The edited habit text
   * @return {void}
   */
  function clickEdit(id: string, text: string): void {
    if (text === habitText) {
      return;
    }
    setIsEditingHabit(true);
    setHabitText(text);
    setHabitId(id);
  }

  /**
   * Click handler for the "Delete" button
   * @return {void}
   */
  function clickDelete(): void {
    deleteHabit(habitId);
    const tempFinishedHabitIds = today.finishedHabitIds.filter(
      (tempId) => tempId !== habitId
    );
    const tempRemainingHabitIds = today.remainingHabitIds.filter(
      (tempId) => tempId !== habitId
    );
    setDayInfo({
      ...today,
      finishedHabitIds: tempFinishedHabitIds,
      remainingHabitIds: tempRemainingHabitIds,
    });
    setIsEditingHabit(false);
    setHabitText('');
  }

  /**
   * Click handler for going to the "Finish Day" summary screen
   * @return {void}
   */
  function goToFinishDayScreen() {
    navigation.navigate('FinishDayScreen', { remainingHabits, finishedHabits });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {!isAddingHabit && !isEditingHabit ? (
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
              ref={inputRef}
              containerStyle={styles.addHabitInputContainer}
              placeholder="Add a habit"
              onChangeText={setHabitText}
              value={habitText}
            />
            <View style={styles.addHabitIconContainer}>
              <TouchableOpacity
                style={[styles.date, styles.closeIcon]}
                onPress={isEditingHabit ? clickDelete : clickClose}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color={
                    isEditingHabit
                      ? Colors.sadRed
                      : Colors[colorScheme].mutedText
                  }
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
            <Card style={{ marginBottom: 10 }}>
              <Text style={styles.title}>Remaining</Text>
              <ScrollView style={styles.scrollList}>
                {remainingHabits.length ? (
                  <>
                    {remainingHabits.map((habit) => (
                      <HabitContainer
                        key={habit.id}
                        habit={habit}
                        clickToggle={clickToggle}
                        clickEdit={clickEdit}
                        isAddingHabit={isAddingHabit}
                        isEditingHabit={isEditingHabit}
                      />
                    ))}
                  </>
                ) : (
                  <Text style={styles.habitCardEmptyMessage}>
                    You've completed all your habits today!
                  </Text>
                )}
              </ScrollView>
            </Card>
            <Card>
              <Text style={styles.title}>Finished</Text>
              <ScrollView style={styles.scrollList}>
                {finishedHabits.length ? (
                  <>
                    {finishedHabits.map((habit) => (
                      <HabitContainer
                        key={habit.id}
                        habit={habit}
                        clickToggle={clickToggle}
                        clickEdit={clickEdit}
                        isAddingHabit={isAddingHabit}
                        isEditingHabit={isEditingHabit}
                      />
                    ))}
                  </>
                ) : (
                  <Text style={styles.habitCardEmptyMessage}>
                    When you've finished a habit, bring it on down!
                  </Text>
                )}
              </ScrollView>
            </Card>
            <View style={styles.buttonContainer}>
              <ThemeButton
                title="Finish Day"
                onPress={goToFinishDayScreen}
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
  const { habitReducer, dayReducer } = state;
  return { habitReducer, dayReducer };
};
const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload:
      | HabitType
      | { id: string; checked: boolean }
      | { id: string; text: string }
      | { id: string }
      | DayType;
  }) => void
) => {
  return {
    addHabit: (habit: HabitType) => {
      dispatch(addHabit(habit));
    },
    toggleHabit: (id: string, checked: boolean) => {
      dispatch(toggleHabit(id, checked));
    },
    updateHabit: (id: string, text: string) => {
      dispatch(updateHabit(id, text));
    },
    deleteHabit: (id: string) => {
      dispatch(deleteHabit(id));
    },
    setDayInfo: (dayInfo: DayType) => {
      dispatch(setDayInfo(dayInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HabitsScreen);

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
  habitCardEmptyMessage: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
    alignSelf: 'center',
    marginVertical: 20,
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
