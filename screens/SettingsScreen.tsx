import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { Button, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, View } from '../components/Themed';
import firebase from '../firebase';
import { saveDay } from '../redux/actions/DayActions';
import { addHabit } from '../redux/actions/HabitsActions';
import { HabitType, IDayType } from '../types';
import { habitsFixture } from '../__fixtures__/factory/habit';
import { generateTestDaysWithHabitsRandom } from '../__fixtures__/testutil';

function SettingsScreen({
  route, // TODO: these should only appear in develop mode
  saveDay,
  addHabit,
}) {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  async function signOut() {
    await firebase.auth().signOut();
    navigation.navigate('Login');
  }

  // TODO: remove after testing
  function clickInjectTestData() {
    const habits = habitsFixture([
      { text: 'Workout' },
      { text: 'Eat lunch' },
      { text: 'Code' },
    ]);
    addHabit(habits);
    const days = generateTestDaysWithHabitsRandom(100, habits, [
      'Great',
      'Okay',
      'Not Good',
    ]);
    saveDay(days);
  }

  async function clearAppData() {
    // TODO: remove after dev
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      }
      if (Platform.OS === 'ios') {
        console.log('clearing app data');
        await AsyncStorage.multiRemove(asyncStorageKeys);
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
      <Button
        title="Configure MyCircle Friends"
        onPress={() =>
          navigation.navigate('ConfigureMyCircleFriends', {
            isSendingPanicMessage: false,
          })
        }
      />
      <Button
        title="Configure MyCircle Message"
        onPress={() => navigation.navigate('ConfigureMyCircleMessage')}
      />
      {/* TODO: remove after dev */}
      <Button title="Inject Test Data" onPress={clickInjectTestData} />
      <Button title="Clear App Data" onPress={clearAppData} />
      <Button title="Sign Out" onPress={signOut}></Button>
    </View>
  );
}

// TODO: refactor to useDispatch for simplicity
const mapDispatchToProps = (dispatch) => {
  return {
    saveDay: (dayInfo: IDayType) => {
      dispatch(saveDay(dayInfo));
    },
    addHabit: (habit: HabitType) => {
      dispatch(addHabit(habit));
    },
  };
};

export default connect(mapDispatchToProps)(SettingsScreen);

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
