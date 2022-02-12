import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { BarChart } from '../components/Charts/BarChart';
import { LineChart } from '../components/Charts/LineChart';
import { PieMoods } from '../components/Charts/PieMoods';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import ThemeButton from '../components/ThemeButton';
import { Text, View } from '../components/Themed';
import TutorialModal from '../components/TutorialModals/TutorialModal';
import { RootState } from '../redux/store';
import { HabitType, IDayType, IHabitType, ValidMood } from '../types';
import getDateString from '../utils';
import Colors from '../constants/Colors'
import { Pie } from '../components/Charts/Pie';

type Mode = 'date' | 'time';

function DayMetricsScreen({ navigation, route }) {
  const days = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  );
  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );
  const currentDay = days[route.params.selectedDay];
  const [selectedMood, setSelectedMood] = useState<ValidMood | 'all'>('all');
  const [selectedHabitId, setSelectedHabitId] = useState<string>('top3');
  const [startDate, setStartDate] = useState<string>(Object.keys(days)[0]);
  const [endDate, setEndDate] = useState<string>(DateTime.now().toISODate());

  const moods = ['Great', 'Okay', 'Not Good'];

  // TODO: set an aspect ratio for the whole project in Redux that adapts to the screen size
  const aspectRatio =
    Dimensions.get('screen').height / Dimensions.get('screen').width;

  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);

  useEffect(() => {
    setRemainingHabits(currentDay.remainingHabitIds.map((id) => habits[id]));
    setFinishedHabits(currentDay.finishedHabitIds.map((id) => habits[id]));
  }, []);

  function goBack() {
    navigation.goBack();
  }

  function goToEndOfDayNotes() {
    navigation.navigate('EndOfDayNotesScreen');
  }

  return (
    <>
      <View>
        <ScrollView>
          <Text style={[styles.date, { color: Colors.themeColor }]}>
            {getDateString('').date}
          </Text>
          <HabitSummaryCard
            remainingHabits={remainingHabits}
            finishedHabits={finishedHabits}
            habitCount={currentDay.habitCount}
            habitPercentComplete={currentDay.habitPercentComplete}
          />
          <Pie day={days} />
          {currentDay.endOfDayNotes && (
            <Button title="View End of Day Notes" onPress={goToEndOfDayNotes} />
          )}
        </ScrollView>
        <ThemeButton title="Go Back" onPress={goBack} />
        <TutorialModal />
      </View>
    </>
  );
}

export default DayMetricsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: 'white',
    color: 'white',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
});
