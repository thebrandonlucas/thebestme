import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ThemeButton from '../components/ThemeButton';
import { Text, View } from '../components/Themed';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


function DayMetricsScreen({ navigation, route, days, habits }) {
  const currentDay = days[route.params.selectedDay];

  useEffect(() => {}, []);

  function goBack() {
    navigation.goBack();
  }

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check back soon for some awesome analytics features!</Text>
      {/* <VictoryChart width={300} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart> */}
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
      <ThemeButton title="Go Back" onPress={goBack} />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { days } = state.dayReducer;
  const { habits } = state.habitReducer;
  return { days, habits };
};
export default connect(mapStateToProps)(DayMetricsScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#f5fcff"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
