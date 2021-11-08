import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Calendar, Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { MoodToColor } from '../constants/MoodToColor';
import { CalendarDataType, DayType, ICalendarDataType } from '../types';
import getDateString, { getDateFromISOString } from '../utils';
import { getMoodMode } from '../utils/mood';

function DataScreen({ habits, days, navigation }) {
  const currentDate = new Date().toISOString();
  const formattedDate = getDateString(currentDate).date;
  const isoDate = getDateFromISOString(currentDate);

  const [calendarData, setCalendarData] = useState<CalendarDataType>({});
  const [selectedDay, setSelectedDay] = useState('');
  const [moodMode, setMoodMode] = useState('');

  useEffect(() => {
    let tempCalendarData: ICalendarDataType = {};
    let currentCalendarData: CalendarDataType = {};
    let dateIsEmpty = true;
    // Set calendar display data according to dates
    for (const date in days) {
      const currentDay: DayType = days[date];

      if (selectedDay === date) {
        dateIsEmpty = false;
      }
      currentCalendarData = {
        selected: true,
        color:
          selectedDay === date
            ? Colors.iosBlue
            : MoodToColor[getMoodMode(currentDay.mood)],
        startingDay: true,
        endingDay: true,
      };
      tempCalendarData[date] = currentCalendarData;
    }

    // Check if the selected date has no data associated with it
    if (dateIsEmpty) {
      tempCalendarData[selectedDay] = currentCalendarData = {
        selected: true,
        color: Colors.iosBlue,
        startingDay: true,
        endingDay: true,
      };
    }
    setCalendarData(tempCalendarData);

    if (days[selectedDay]) {
      const tempMoodMode = getMoodMode(days[selectedDay].mood);
      setMoodMode(tempMoodMode);
    }
  }, [days, selectedDay]);

  function goToDayMetricsScreen() {
    navigation.navigate('DayMetricsScreen', { selectedDay });
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
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
        }}
      />
      <Card style={styles.cardContainer}>
        {days[selectedDay] ? (
          <>
            <Text style={styles.title}>Most common mood: <Text style={[{ color: MoodToColor[moodMode] }]}>{moodMode}</Text></Text>
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

const mapStateToProps = (state) => {
  const { days } = state.dayReducer;
  const { habits } = state.habitReducer;
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
