import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ChartContainer } from '../components/ChartContainer';
import ChartCustomizeModal from '../components/ChartCustomizeModal';
import { Calendar, Card, Text, View } from '../components/Themed';
import TutorialModal from '../components/TutorialModals/TutorialModal';
import { MoodToColor } from '../constants/MoodToColor';
import { selectDay } from '../redux/actions/DayActions';
import {
  CalendarDataType,
  ICalendarDataType,
  IDayType,
  IHabitType,
  ValidMood,
} from '../types';
import { getDateFromISOString } from '../utils';
import getCalendarData from '../utils/getCalendarData';
import { getMoodMode } from '../utils/mood';

function DataScreen({ habits, days, navigation }) {
  const currentDate = DateTime.now().toISODate();
  const isoDate = getDateFromISOString(currentDate);

  const [calendarData, setCalendarData] = useState<CalendarDataType>({});
  const [selectedDay, setSelectedDay] = useState(DateTime.now().toISODate());
  const [moodMode, setMoodMode] = useState('');
  const [selectedMood, setSelectedMood] = useState<ValidMood | 'all'>('all');
  const [selectedHabitId, setSelectedHabitId] = useState<string>('top3');
  const [startDate, setStartDate] = useState<string>(Object.keys(days)[0]);
  const [endDate, setEndDate] = useState<string>(DateTime.now().toISODate());
  const [isChartModalVisible, setIsChartModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let tempCalendarData: ICalendarDataType = getCalendarData(
      days,
      selectedDay
    );
    setCalendarData(tempCalendarData);

    if (days[selectedDay]) {
      const tempMoodMode = getMoodMode(days[selectedDay].mood);
      setMoodMode(tempMoodMode);
    }
  }, [days, selectedDay]);

  function goToDayMetricsScreen() {
    navigation.navigate('DayMetricsScreen', { selectedDay });
  }

  function handleSelectDayButtonPress(day) {
    const dateString = day.dateString;
    setSelectedDay(dateString);
    dispatch(selectDay(dateString));
  }

  // Datetime picker stuff
  function onChangeStartDate(event, selectedDate: Date) {
    setStartDate(DateTime.fromJSDate(selectedDate).toISODate());
  }
  function onChangeEndDate(event, selectedDate: Date) {
    setEndDate(DateTime.fromJSDate(selectedDate).toISODate());
  }

  function openModal() {
    setIsChartModalVisible(true);
  }

  function closeModal() {
    setIsChartModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          style={styles.calendar}
          markingType="period"
          markedDates={calendarData}
          current={isoDate}
          onDayPress={handleSelectDayButtonPress}
        />
        <Card style={styles.cardContainer}>
          {days[selectedDay] ? (
            <>
              <Text style={styles.title}>
                {/* TODO: use "most common mood" when we are 
                    displaying multiple moods and charts for them all */}
                {/* Most common mood:{' '} */}
                Mood:{' '}
                <Text style={[{ color: MoodToColor[moodMode] }]}>
                  {moodMode}
                </Text>
              </Text>
              <Text style={styles.title}>
                Habits Completed: {days[selectedDay].finishedHabitCount} /{' '}
                {days[selectedDay].habitCount},{' '}
                {days[selectedDay].habitPercentComplete}%
              </Text>
              <Button onPress={goToDayMetricsScreen} title="View Details" />
            </>
          ) : (
            <Text style={styles.title}>No data to display</Text>
          )}
        </Card>
        <Text style={styles.title}>{'\n\n'}Visualize Your Data</Text>
        <Text style={styles.label}>
          {'\n'}The charts below show habit and mood data over time. Customize
          the inputs to see different insights!{'\n\n'}
        </Text>
        <Button onPress={openModal} title="Customize Chart Inputs" />
        <ChartContainer
          days={days}
          habits={habits}
          startDate={startDate}
          endDate={endDate}
          selectedHabitId={selectedHabitId}
          selectedMood={selectedMood}
          selectedCharts={{ line: 'Great' }}
        />
        <ChartCustomizeModal
          days={days}
          habits={habits}
          startDate={startDate}
          endDate={endDate}
          selectedHabitId={selectedHabitId}
          selectedMood={selectedMood}
          isVisible={isChartModalVisible}
          onChangeStartDate={onChangeStartDate}
          onChangeEndDate={onChangeEndDate}
          setSelectedHabitId={setSelectedHabitId}
          setSelectedMood={setSelectedMood}
          closeModal={closeModal}
        />
      </ScrollView>
      <TutorialModal />
    </View>
  );
}

const mapStateToProps = (state: { dayReducer; habitReducer }) => {
  const { days }: IDayType = state.dayReducer;
  const { habits }: IHabitType = state.habitReducer;
  return { days, habits };
};
export default connect(mapStateToProps)(DataScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  calendar: {
    width: '100%',
    aspectRatio: 1,
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 2 / 1,
    justifyContent: 'space-around',
  },
  label: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
