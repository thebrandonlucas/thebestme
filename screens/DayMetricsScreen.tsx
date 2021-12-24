import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { VictoryChart, VictoryLine, VictoryPie } from 'victory-native';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import ThemeButton from '../components/ThemeButton';
import { View } from '../components/Themed';
import { Colors } from '../constants';
import { MoodToColor } from '../constants/MoodToColor';
import { RootState } from '../redux/store';
import { HabitType, IDayType, IHabitType } from '../types';

function DayMetricsScreen({ navigation, route }) {
  const days = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  );
  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );
  const currentDay = days[route.params.selectedDay];

  // TODO: set an aspect ratio for the whole project in Redux that adapts to the screen size
  const aspectRatio =
    Dimensions.get('screen').height / Dimensions.get('screen').width;

  const data = [
    { mood: 'Great', frequency: 4 },
    { mood: 'Okay', frequency: 3 },
    { mood: 'Not Good', frequency: 1 },
  ];

  // Needs all categories to be initialized to 0 for animation to work
  // Animation occurs after data param gets set
  const initialPieChartData = [
    { mood: 'Great', frequency: 100 },
    { mood: 'Okay', frequency: 0 },
    { mood: 'Not Good', frequency: 0 },
  ];

  // Will need a line chart for each habit & mood combo (unless I can think of a better chart)
  const habitVsMoodHappyWashingDishesData = [
    { habitCompleted: 0, happinessFreq: 1 },
    { habitCompleted: 3, happinessFreq: 3 },
    { habitCompleted: 5, happinessFreq: 3 },
    { habitCompleted: 2, happinessFreq: 0 },
    { habitCompleted: 4, happinessFreq: 2 },
    { habitCompleted: 1, happinessFreq: 1 },
    { habitCompleted: 5, happinessFreq: 3 },
  ];

  const habitVsMoodSadData = [];

  const habitVsMoodNeutralData = [];

  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [pieChartData, setPieChartData] = useState(initialPieChartData);

  useEffect(() => {
    let tempRemainingHabits = [],
      tempFinishedHabits = [];
    for (let i = 0; i < currentDay.habitIds.length; i++) {
      const currentHabit = habits[currentDay.habitIds[i]];
      if (currentHabit.checked === false) {
        tempRemainingHabits.push(currentHabit);
      } else {
        tempFinishedHabits.push(currentHabit);
      }
    }
    console.log('dim', Dimensions.get('screen'));
    setRemainingHabits(tempRemainingHabits);
    setFinishedHabits(tempFinishedHabits);
    setPieChartData(data);
  }, []);

  function goBack() {
    navigation.goBack();
  }

  function goToEndOfDayNotes() {
    navigation.navigate('EndOfDayNotesScreen');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollList}>
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
        <VictoryPie
          data={pieChartData}
          x="mood"
          y="frequency"
          colorScale={[Colors.happyGreen, Colors.neutralYellow, Colors.sadRed]}
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
        <VictoryChart>
          <VictoryLine
            x="habitCompleted"
            y="happinessFreq"
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' },
            }}
            data={habitVsMoodHappyWashingDishesData}
          />
        </VictoryChart>

        {currentDay.endOfDayNotes && (
          <Button title="View End of Day Notes" onPress={goToEndOfDayNotes} />
        )}
        {/* </VictoryChart> */}
        {/* <Text>Date: {currentDay.date}</Text>
      <Text>Remaining Habits: </Text>
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
  );
}

export default DayMetricsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,

    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#f5fcff"
  },
  scrollList: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  // backButton: {
  //   alignSelf: 'center'
  // }
});
