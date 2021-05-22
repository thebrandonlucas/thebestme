import * as React from 'react';
import { StyleSheet } from 'react-native';
import CalendarTestData from '../components/CalendarTestData';
import { Calendar, Card, Text, View } from '../components/Themed';
import { themeColor } from '../constants/Colors';
import { getDateString } from '../utils/index.ts';

export default function DataScreen() {
  const { date } = getDateString();

  return (
    <View style={styles.container}>
      <Text style={[styles.date, { color: themeColor }]}>{date}</Text>
      <Calendar
        style={styles.calendar}
        markingType="period"
        markedDates={CalendarTestData}
      />
      <Card style={styles.cardContainer} />
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
