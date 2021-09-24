import * as React from 'react';
import { StyleSheet } from 'react-native';
import CalendarTestData from '../components/CalendarTestData';
import { Calendar, Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import getDateString from '../utils';
import { useDays } from '../hooks/useDays';

export default function DataScreen() {
  const { date } = getDateString(new Date().toISOString());
  const daysData = useDays();

  return (
    <View style={styles.container}>
      <Text style={[styles.date, { color: Colors.themeColor }]}>{date}</Text>
      <Calendar
        style={styles.calendar}
        markingType="period"
        markedDates={CalendarTestData}
      />
      <Card style={styles.cardContainer}>
        <Text>More Coming Soon!</Text>
      </Card>
    </View>
  );
}

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
