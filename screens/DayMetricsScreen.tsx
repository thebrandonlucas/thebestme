import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { BarChart } from '../components/Charts/BarChart';
import { LineChart } from '../components/Charts/LineChart';
import { Pie } from '../components/Charts/Pie';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import ThemeButton from '../components/ThemeButton';
import { Text, View } from '../components/Themed';
import { MoodToColor } from '../constants/MoodToColor';
import { RootState } from '../redux/store';
import { HabitType, IDayType, IHabitType, ValidMood } from '../types';

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
          {/* <TextInputModal text={currentDay.endOfDayNotes} label='End of Day Notes' disabled={true}/> */}
          <HabitSummaryCard
            remainingHabits={remainingHabits}
            finishedHabits={finishedHabits}
            habitCount={currentDay.habitCount}
            habitPercentComplete={currentDay.habitPercentComplete}
          />

          {/* TODO: make bar chart that shows per-habit mood frequency for each mood (triple bar chart) */}
          {/* <VictoryChart width={300} theme={VictoryTheme.material}> */}
          {/* <VictoryBar data={data} x="mood" y="frequency" style={{
      data: {
          fill: ({datum}) => MoodToColor[datum.mood],
      },
      labels: {
          fontSize: 10,
          color: ({datum}) => MoodToColor[datum.mood]
      }
  }} /> */}
          <Pie days={days} startDate={startDate} endDate={endDate} />
          <BarChart
            days={days}
            habits={habits}
            startDate={startDate}
            endDate={endDate}
            selectedHabitId={selectedHabitId}
            selectedMood={selectedMood}
          />

          <LineChart
            days={days}
            startDate={startDate}
            endDate={endDate}
            selectedMood={selectedMood}
          />
          

          {currentDay.endOfDayNotes && (
            <Button title="View End of Day Notes" onPress={goToEndOfDayNotes} />
          )}

          {/* <VictoryChart
            theme={barChartStyle}
            width={Dimensions.get('screen').width}
            domainPadding={{ x: 50 }}
          >
            <VictoryBar
              x="habit"
              y="frequency"
              style={{ data: { fill: Colors.sadRed } }}
              data={[
                { habit: 'Running', frequency: 5 },
                { habit: 'Brush Teeth', frequency: 3 },
                { habit: 'Get lunch', frequency: 2 },
              ]}
            />
          </VictoryChart> */}

          {/* </VictoryChart> */}
          {/* <Text>Date: {currentDay.date}</Text>

{currentDay.habitIds.map((id) => {
  return (
    habits[id].checked === true && (
      <Text key={uuidv4()}>{habits[id].text}</Text>
    )
  );
})}
<Text>Finished Habits: </Text>
{currentDay.habitIds.map((id) => {
  return (
    habits[id].checked === false && (
      <Text key={uuidv4()}>{habits[id].text}</Text>
    )
  );
})}
<Text>
  Primary Journals completed this day: {currentDay.journalIds.length}
</Text>
<Text>CBT Journals Completed: {currentDay.cbtIds.length}</Text>
<Text>AWARE Journals Completed: {currentDay.awareIds.length}</Text> */}
        </ScrollView>
        <ThemeButton title="Go Back" onPress={goBack} />
      </View>
    </>
  );
}

export default DayMetricsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // flex: 1,
  },
  scrollList: {
    // width: '100%',
    // alignItems: 'center',
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
});
