import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ThemeButton from '../components/ThemeButton';
import { Text, View } from '../components/Themed';

function DayMetricsScreen({ navigation, route, days, habits }) {
  const currentDay = days[route.params.selectedDay];

  useEffect(() => {}, []);

  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check back soon for some awesome analytics features!</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
