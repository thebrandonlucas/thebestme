import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { Calendar, Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { MoodToColor } from '../constants/MoodToColor';
import { selectDay } from '../redux/actions/DayActions';
import {
  CalendarDataType,
  ICalendarDataType,
  IDayType,
  IHabitType,
} from '../types';
import getDateString, { getDateFromISOString } from '../utils';
import getCalendarData from '../utils/getCalendarData';
import { getMoodMode } from '../utils/mood';

function DataScreen({ habits, days, navigation }) {
  const currentDate = DateTime.now().toISODate();
  const formattedDate = getDateString(currentDate).date;
  const isoDate = getDateFromISOString(currentDate);

  const [calendarData, setCalendarData] = useState<CalendarDataType>({});
  const [selectedDay, setSelectedDay] = useState(DateTime.now().toISODate());
  const [moodMode, setMoodMode] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    let tempCalendarData: ICalendarDataType = getCalendarData(
      selectedDay,
      days
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
    const dateString = day.dateString
    setSelectedDay(dateString);
    dispatch(selectDay(dateString));
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.date, { color: Colors.themeColor }]}>
        {formattedDate}
      </Text>
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
              Most common mood:{' '}
              <Text style={[{ color: MoodToColor[moodMode] }]}>{moodMode}</Text>
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
