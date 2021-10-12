import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Calendar, Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { CalendarDataType } from '../types';
import getDateString, { getDateFromISOString } from '../utils';

const moodToColor = {
  Happy: Colors.happyGreen,
  Neutral: Colors.neutralYellow,
  Sad: Colors.sadRed,
};

function DataScreen({ days }) {
  const currentDate = new Date().toISOString();
  const formattedDate = getDateString(currentDate).date;
  const isoDate = getDateFromISOString(currentDate);

  const [calendarData, setCalendarData] = useState<CalendarDataType>({});
  const [selectedDay, setSelectedDay] = useState<string>('');

  useEffect(() => {
    // TODO: format days data
    let tempCalendarData = {};

    let currentCalendarData: CalendarDataType = {};
    for (const date in days) {
      const currentDay = days[date];
      const dateString = getDateFromISOString(date);
      currentCalendarData = {
        [dateString]: {
          selected: true,
          // Blue color if current day is selectedDay
          color:
            dateString === selectedDay
              ? Colors.iosBlue
              : // TODO: get avg mood
                moodToColor[currentDay.mood[0]],
          startingDay: true,
          endingDay: true,
        },
      };

      tempCalendarData = { ...tempCalendarData, ...currentCalendarData };
    }

    // If the selected day is not a day with info
    if (!(selectedDay in days)) {
      currentCalendarData = {
        [selectedDay]: {
          selected: true,
          // Blue color if current day is selectedDay
          color: Colors.iosBlue,
          startingDay: true,
          endingDay: true,
        },
      };
    }
    tempCalendarData = { ...tempCalendarData, ...currentCalendarData };

    setCalendarData(tempCalendarData);
  }, [days, selectedDay]);

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
        {/* <View style */}
        {days[selectedDay] ? (
          <Text>
            {days[selectedDay].mood.map((m) => (
              <Text>{m}, </Text>
            ))}
          </Text>
        ) : (
          <Text>No data to display for this day</Text>
        )}
      </Card>
    </View>
  );
}

const mapStateToProps = (state) => {
  const { days } = state.dayReducer;
  return { days };
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
  },
});
