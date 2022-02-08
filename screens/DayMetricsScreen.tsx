import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ColorScalePropType } from 'victory-core';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryLine,
  VictoryPie,
} from 'victory-native';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import ThemeButton from '../components/ThemeButton';
import { Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { MoodToColor } from '../constants/MoodToColor';
import { RootState } from '../redux/store';
import {
  HabitFrequency,
  HabitType,
  IDayType,
  IHabitType,
  ValidMood,
} from '../types';
import { getDaysInTimeRange } from '../utils/day';
import {
  getColorScale,
  replaceHabitFrequencyIdsWithText,
} from '../utils/graph';
import {
  getHabitFrequencyForMoodInTimeRange,
  getTopHabitFrequenciesPerMood,
} from '../utils/habit';

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

  const [barChartDataHappy, setBarChartDataHappy] = useState<HabitFrequency[]>(
    []
  );
  const [barChartDataNeutral, setBarChartDataNeutral] = useState<
    HabitFrequency[]
  >([]);
  const [barChartDataSad, setBarChartDataSad] = useState<HabitFrequency[]>([]);
  const [barChartColorScale, setBarChartColorScale] =
    useState<ColorScalePropType>([]);

  useEffect(() => {
    configureBarChart();
  }, [selectedHabitId, selectedMood, startDate, endDate]);

  const moods = ['Great', 'Okay', 'Not Good'];

  // Datetime picker stuff

  function onChangeStartDate(event, selectedDate: Date) {
    setStartDate(DateTime.fromJSDate(selectedDate).toISODate());
  }
  function onChangeEndDate(event, selectedDate: Date) {
    setEndDate(DateTime.fromJSDate(selectedDate).toISODate());
  }

  // TODO: set an aspect ratio for the whole project in Redux that adapts to the screen size
  const aspectRatio =
    Dimensions.get('screen').height / Dimensions.get('screen').width;

  const pChartData = [
    { mood: 'Great', frequency: 4 },
    { mood: 'Okay', frequency: 3 },
    { mood: 'Not Good', frequency: 1 },
  ];

  const data1 = [
    { mood: 'Running', frequency: 4 },
    { mood: 'Brush Teeth', frequency: 3 },
    { mood: 'Get lunch', frequency: 1 },
  ];

  const data2 = [
    { mood: 'Running', frequency: 5 },
    { mood: 'Brush Teeth', frequency: 2 },
    { mood: 'Get lunch', frequency: 5 },
  ];

  const data3 = [
    { mood: 'Running', frequency: 1 },
    { mood: 'Brush Teeth', frequency: 6 },
    { mood: 'Get lunch', frequency: 2 },
  ];

  // Needs all categories to be initialized to 0 for animation to work
  // Animation occurs after data param gets set
  const initialPieChartData = [
    { mood: 'Great', frequency: 0 },
    { mood: 'Okay', frequency: 0 },
    { mood: 'Not Good', frequency: 0 },
  ];

  // Will need a line chart for each habit & mood combo (unless I can think of a better chart)
  const lineChartData = [
    { x: new Date(2021, 5, 1), y: 'Great' },
    { x: new Date(2021, 5, 2), y: 'Okay' },
    { x: new Date(2021, 5, 3), y: 'Okay' },
    { x: new Date(2021, 5, 4), y: 'Okay' },
    { x: new Date(2021, 5, 7), y: 'Great' },
    { x: new Date(2021, 5, 8), y: 'Great' },
    { x: new Date(2021, 5, 9), y: 'Bad' },
    { x: new Date(2021, 5, 10), y: 'Great' },
    { x: new Date(2021, 5, 11), y: 'Great' },
  ];

  const habitVsMoodSadData = [];

  const habitVsMoodNeutralData = [];

  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [pieChartData, setPieChartData] = useState(initialPieChartData);

  useEffect(() => {
    setRemainingHabits(currentDay.remainingHabitIds.map((id) => habits[id]));
    setFinishedHabits(currentDay.finishedHabitIds.map((id) => habits[id]));
    setPieChartData(pChartData);
  }, []);

  function goBack() {
    navigation.goBack();
  }

  function goToEndOfDayNotes() {
    navigation.navigate('EndOfDayNotesScreen');
  }

  const barChartStyle = {
    axis: {
      style: {
        tickLabels: {
          // this changed the color of my numbers to white
          fill: 'white',
        },
      },
    },
  };

  function configureBarChart() {
    // TODO: allow the user to configure remaining habits as well as finished habits
    const selectedDays = getDaysInTimeRange(
      days,
      // TODO: change these to ISO date immediately in setState
      startDate,
      endDate
    );

    const tempHabits =
      selectedHabitId === 'top3'
        ? habits
        : { [selectedHabitId]: habits[selectedHabitId] };

    setBarChartColorScale(getColorScale(selectedMood));
    let habitFrequencies: HabitFrequency[];
    if (selectedMood !== 'all') {
      if (selectedHabitId === 'top3') {
        habitFrequencies = replaceHabitFrequencyIdsWithText(
          getTopHabitFrequenciesPerMood(
            selectedDays,
            tempHabits,
            3,
            selectedMood
          ),
          habits
        );
      } else {
        habitFrequencies = replaceHabitFrequencyIdsWithText(
          [
            getHabitFrequencyForMoodInTimeRange(
              selectedHabitId,
              selectedDays,
              selectedMood
            ),
          ],
          habits
        );
      }
    }
    switch (selectedMood) {
      case 'Great':
        setBarChartDataHappy(habitFrequencies);
        setBarChartDataNeutral([]);
        setBarChartDataSad([]);
        break;
      case 'Okay':
        setBarChartDataNeutral(habitFrequencies);
        setBarChartDataHappy([]);
        setBarChartDataSad([]);
        break;
      case 'Not Good':
        setBarChartDataSad(habitFrequencies);
        setBarChartDataHappy([]);
        setBarChartDataNeutral([]);
        break;
      default:
        if (selectedHabitId !== 'top3') {
          setBarChartDataHappy(
            replaceHabitFrequencyIdsWithText(
              [
                getHabitFrequencyForMoodInTimeRange(
                  selectedHabitId,
                  selectedDays,
                  'Great'
                ),
              ],
              habits
            )
          );
          setBarChartDataNeutral(
            replaceHabitFrequencyIdsWithText(
              [
                getHabitFrequencyForMoodInTimeRange(
                  selectedHabitId,
                  selectedDays,
                  'Okay'
                ),
              ],
              habits
            )
          );
          setBarChartDataSad(
            replaceHabitFrequencyIdsWithText(
              [
                getHabitFrequencyForMoodInTimeRange(
                  selectedHabitId,
                  selectedDays,
                  'Not Good'
                ),
              ],
              habits
            )
          );
        } else {
          setBarChartDataHappy(
            replaceHabitFrequencyIdsWithText(
              getTopHabitFrequenciesPerMood(selectedDays, habits, 3, 'Great'),
              habits
            )
          );
          setBarChartDataNeutral(
            replaceHabitFrequencyIdsWithText(
              getTopHabitFrequenciesPerMood(selectedDays, habits, 3, 'Okay'),
              habits
            )
          );
          setBarChartDataSad(
            replaceHabitFrequencyIdsWithText(
              getTopHabitFrequenciesPerMood(
                selectedDays,
                habits,
                3,
                'Not Good'
              ),
              habits
            )
          );
        }
        break;
    }
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
          <Text>Start Date/Time</Text>
          <DateTimePicker
            testID="dateTimePicker"
            // FIXME: center pickers! How?
            // style={{marginHorizontal: '40%'}}
            value={DateTime.fromISO(startDate).toJSDate()}
            // FIXME: 'datetime' only available on ios
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChangeStartDate}
          />
          <Text>End Date/Time</Text>
          <DateTimePicker
            testID="dateTimePicker"
            // FIXME: center pickers! How?
            // style={{marginHorizontal: '40%'}}
            value={DateTime.fromISO(endDate).toJSDate()}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChangeEndDate}
          />
          <Text>Mood</Text>
          <Picker
            selectedValue={selectedMood}
            onValueChange={(itemValue, itemIndex) => setSelectedMood(itemValue)}
          >
            <Picker.Item color="white" label="All" value="all" />
            {moods.map((mood) => (
              <Picker.Item
                color={MoodToColor[mood]}
                label={mood}
                value={mood}
              />
            ))}
          </Picker>

          <Text>Habit</Text>
          <Picker
            selectedValue={selectedHabitId}
            onValueChange={(itemValue) => setSelectedHabitId(itemValue)}
          >
            <Picker.Item color="white" label="Top 3 Habits" value="top3" />
            {Object.keys(habits).map((habitId) => (
              <Picker.Item
                color="white"
                label={habits[habitId].text}
                value={habitId}
              />
            ))}
          </Picker>
          <VictoryChart theme={barChartStyle} domainPadding={{ x: 50 }}>
            <VictoryAxis dependentAxis tickFormat={(t) => Math.round(t)} />
            <VictoryAxis />
            <VictoryGroup
              colorScale={barChartColorScale}
              offset={20}
              style={{ data: { width: 15 } }}
            >
              <VictoryBar x="habit" y="frequency" data={barChartDataHappy} />
              <VictoryBar x="habit" y="frequency" data={barChartDataNeutral} />
              <VictoryBar x="habit" y="frequency" data={barChartDataSad} />
            </VictoryGroup>
          </VictoryChart>
          <VictoryLegend
            // style={{ alignItems: 'center', border: { fill: 'red', width: 1 } }}
            width={Dimensions.get('screen').width}
            // TODO: how to dynamically set the height of the legend based on
            height={100}
            // FIXME: Is dividing the screen width by 6 guaranteed to center it?
            x={Dimensions.get('screen').width / 6}
            title="Top 3 habits"
            orientation="horizontal"
            gutter={20}
            centerTitle
            style={{
              title: { fontSize: 20, fill: 'white' },
            }}
            data={[
              {
                name: 'Great',
                symbol: { fill: Colors.happyGreen },
                labels: { fill: Colors.happyGreen },
              },
              {
                name: 'Okay',
                symbol: { fill: Colors.neutralYellow },
                labels: { fill: Colors.neutralYellow },
              },
              {
                name: 'Not Good',
                symbol: { fill: Colors.sadRed },
                labels: { fill: Colors.sadRed },
              },
            ]}
          />
          <VictoryPie
            data={pieChartData}
            x="mood"
            y="frequency"
            colorScale={[
              Colors.happyGreen,
              Colors.neutralYellow,
              Colors.sadRed,
            ]}
            style={{
              labels: {
                // FIXME: fix typescript
                fill: ({ datum }) => MoodToColor[datum.mood],
                fontSize: 15,
                fontWeight: 'bold',
              },
              border: { color: 'red', width: 1 },
            }}
            width={Dimensions.get('screen').width}
            height={aspectRatio * 135}
            innerRadius={65}
            animate={{ easing: 'exp' }}
          />
          <VictoryChart theme={barChartStyle} scale={'time'}>
            <VictoryAxis dependentAxis tickValues={['Bad', 'Okay', 'Great']} />
            <VictoryAxis />
            <VictoryLine
              style={{
                data: { stroke: Colors.happyGreen },
                parent: { border: '1px solid #ccc' },
              }}
              data={lineChartData}
              sortKey={['Bad', 'Great', 'Okay']}
            />
          </VictoryChart>

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
