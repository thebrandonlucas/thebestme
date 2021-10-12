import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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

function DataScreen({ habits, days }) {
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
              : moodToColor[currentDay.mood[0]],
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
  }, [days, selectedDay, habits]);

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
          {days[selectedDay] ? (
            <>
              <Text>
                Mood:{' '}
                {days[selectedDay].mood.map((m: string) => (
                  <Text>{m}, </Text>
                ))}{' '}
              </Text>
              <Text>Habit Count: {days[selectedDay].habitCount}</Text>
              <Text>
                Habits Complete: {days[selectedDay].habitPercentComplete}%
              </Text>
              <Text></Text>
              <Text style={styles.label}>Remaining Habits: </Text>
              <Text>
                {days[selectedDay].remainingHabitIds.length ? (
                  days[selectedDay].remainingHabitIds.map(
                    (id: string) => habits[id].text
                  )
                ) : (
                  <Text>No incomplete habits</Text>
                )}
              </Text>
              <Text style={styles.label}>Completed Habits: </Text>
              <Text>{'\t'}
                {days[selectedDay].finishedHabitIds ? (
                  days[selectedDay].finishedHabitIds.map(
                    (id: string) => habits[id].text
                  )
                ) : (
                  <Text>No finished habits</Text>
                )}
              </Text>

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
  const { habits } = state.habitReducer;
  const { days } = state.dayReducer;
  return { habits, days };
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
