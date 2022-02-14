import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { Alert, Button, Platform, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from '../components/Themed';
import firebase from '../firebase';
import { saveDay } from '../redux/actions/DayActions';
import { addHabit } from '../redux/actions/HabitsActions';
import { RootState } from '../redux/store';
import { IDayType, IHabitType } from '../types';
import { habitsFixture } from '../__fixtures__/factory/habit';
import { generateTestDaysWithHabitsRandom } from '../__fixtures__/testutil';

function SettingsScreen({
  route, // TODO: these should only appear in develop mode
}) {
  const navigation = useNavigation();

  let habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );

  // const currentDay = useSelector<RootState, IDayType>(
  //   (state) => state.dayReducer.days
  // );

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  async function signOut() {
    await firebase.auth().signOut();
    navigation.navigate('Login');
  }

  // TODO: remove after testing
  function clickInjectTestData() {
    // Only add default habits if the user doesn't have any already
    if (Object.keys(habits).length === 0) {
      habits = habitsFixture([
        { text: 'Workout' },
        { text: 'Eat lunch' },
        { text: 'Code' },
      ]);
      dispatch(addHabit(habits));
    }

    const days = generateTestDaysWithHabitsRandom(100, habits, [
      'Great',
      'Okay',
      'Not Good',
    ]);
    const date = '2022-02-12';
    const day: IDayType = {
      [date]: {
        cbtIds: [],
        date: '2022-02-12',
        endOfDayNotes: [],
        finishedHabitCount: 0,
        finishedHabitIds: ['b1b9eda9-cabd-4988-aedb-f8486b12f19c'],
        habitCount: 3,
        habitPercentComplete: 0.67,
        journalIds: [],
        mood: ['Not Good'],
        remainingHabitIds: [
          'ecf8569f-d961-481e-9669-9a4992c882af',
          '9a74c1d5-cd9a-4c72-bcaf-40047b4beeb1',
        ],
      },
    };
    dispatch(saveDay(days));
  }

  async function clearAppData() {
    // TODO: remove after dev
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
        Alert.alert('App data cleared');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <Button
        title="Configure MyCircle Friends"
        onPress={() =>
          navigation.navigate('ConfigureMyCircleFriends', {
            isSendingPanicMessage: false,
          })
        }
      /> */}
      {/* <Button
        title="Configure MyCircle Message"
        onPress={() => navigation.navigate('ConfigureMyCircleMessage')}
      /> */}
      {/* TODO: remove after dev */}
      <Button title="Inject Test Data" onPress={clickInjectTestData} />
      {/* <Button title="Clear App Data" onPress={clearAppData} /> */}
      <Button title="Sign Out" onPress={signOut}></Button>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
