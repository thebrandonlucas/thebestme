import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useEffect } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from '../components/Themed';
import firebase from '../firebase';
import { saveDay } from '../redux/actions/DayActions';
import { addHabit } from '../redux/actions/HabitsActions';
import { resetApp } from '../redux/actions/RootActions';
import { RootState } from '../redux/store';
import { IDayType, IHabitType } from '../types';
import { habitsFixture } from '../__fixtures__/factory/habit';
import { generateTestDaysWithHabitsRandom } from '../__fixtures__/testutil';

function SettingsScreen({ route }) {
  const navigation = useNavigation();

  let habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  async function signOut() {
    await firebase.auth().signOut();
    await navigation.navigate('Login');
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

  function openDonateLink() {
    WebBrowser.openBrowserAsync(
      'https://www.paypal.com/donate/?hosted_button_id=4L455ZAA7VCSC'
    );
  }

  function deleteAllData() {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to permanently delete all your data for TheBestMe?\n' +
        "WARNING: This action can't be reversed!",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // TODO: test purging from every screen to make sure app doesn't crash
            dispatch(resetApp());
            signOut();
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* TODO: figure out how to properly delete "days" data in redux 
      (resetting to initialState currently crashes the app for some reason).
      This error may be due to the large data size of the "days" object, may need to 
      use something other than AsyncStorage to avoid crashing, as listed here:
      https://stackoverflow.com/questions/48558390/crashes-when-using-redux-persist-with-react-native-on-ios-device
      */}
      {/* <Button color='red' title="Delete All Data" onPress={deleteAllData} /> */}
      <Button title="Donate" onPress={openDonateLink} />
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
  deleteAllBtn: {
    color: 'red',
  },
});
