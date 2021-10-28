import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Calendar, Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { CalendarDataType } from '../types';
import getDateString, { getDateFromISOString } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon'

const moodToColor = {
  Happy: Colors.happyGreen,
  Neutral: Colors.neutralYellow,
  Sad: Colors.sadRed,
};

function DataScreen({ habitReducer, dayReducer }) {
  const currentDate = new Date().toISOString();
  const formattedDate = getDateString(currentDate).date;
  const isoDate = getDateFromISOString(currentDate);

  const [calendarData, setCalendarData] = useState<CalendarDataType>({});
  const [selectedDay, setSelectedDay] = useState<string>('');

  useEffect(() => {
    let tempCalendarData = {};

    let currentCalendarData: CalendarDataType = {};
    for (const date in dayReducer.days) {
      const currentDay = dayReducer.days[date];
      const dateString = DateTime.now().toISODate();
      currentCalendarData = {
        [dateString]: {
          selected: true,
          // Blue color if current day is selectedDay
          color:
            dateString === selectedDay
              ? Colors.iosBlue
              : moodToColor[currentDay.mood[0]],
          startingDay: true,
          endingDay: true,
        },
      };

      tempCalendarData = { ...tempCalendarData, ...currentCalendarData };
    }

    // If the selected day is not a day with info
    if (!(selectedDay in dayReducer.days)) {
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
  }, [dayReducer, selectedDay, habitReducer]);

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
        <ScrollView style={{ height: '100%' }}>
          {dayReducer.days[selectedDay] ? (
            <>
              <Text>
                Mood:{' '}
                {dayReducer.days[selectedDay].mood.map((m: string) => (
                  <Text key={uuidv4()}>{m}, </Text>
                ))}{' '}
              </Text>
              <Text>Habit Count: {dayReducer.days[selectedDay].habitCount}</Text>
              <Text>
                Habits Complete: {dayReducer.days[selectedDay].habitPercentComplete}%
                {'\n'}
              </Text>
              <Text style={styles.label}>Remaining Habits: </Text>
              <Text>
                {dayReducer.days[selectedDay].remainingHabitIds.length ? (
                  dayReducer.days[selectedDay].remainingHabitIds.map(
                    (id: string) => <Text key={uuidv4()}>{habitReducer.habits[id].text}</Text>
                  )
                ) : (
                  <Text>No incomplete habits</Text>
                )}
              </Text>
              <Text style={styles.label}>Completed Habits: </Text>
              <Text>
                {dayReducer.days[selectedDay].finishedHabitIds ? (
                  dayReducer.days[selectedDay].finishedHabitIds.map(
                    (id: string) => habitReducer.habits[id].text
                  )
                ) : (
                  <Text>No finished habits</Text>
                )}
              </Text>
              <Text>Journal Entries: {dayReducer.days[selectedDay].journalIds.length}</Text>
              <Text>CBT Entries: {dayReducer.days[selectedDay].cbtIds.length}</Text>
              <Text>AWARE Entries: {dayReducer.days[selectedDay].awareIds.length}</Text>
              <Text>End of Day Notes</Text>
            </>
          ) : (
            <Text>No data to display for this day</Text>
          )}
        </ScrollView>
      </Card>
    </View>
  );
}

const mapStateToProps = (state) => {
  const { dayReducer, habitReducer } = state;
  return { dayReducer, habitReducer };
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
  label: {
    fontWeight: 'bold'
  },
});
