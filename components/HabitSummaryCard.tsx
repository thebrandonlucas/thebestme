import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { HabitSummaryCardType } from '../types';

export function HabitSummaryCard({
  remainingHabits,
  finishedHabits,
  habitCount,
  habitPercentComplete,
}: HabitSummaryCardType) {

  const finishedHabitCount =
    habitCount && finishedHabits
      ? Object.keys(finishedHabits).length
      : 0;

  const HabitScroll = ({ habits }) => (
    <>
      <ScrollView style={styles.habitScroll}>
        {habits.map((habit: { id: React.Key; text: string }) => (
          <Text
            style={styles.bulletHabit}
            key={habit.id}
            // \u2022 is unicode for 'bullet' character
          >{`\u2022${habit.text}`}</Text>
        ))}
      </ScrollView>
    </>
  );

  return (
    <Card style={styles.habitCard}>
      <Text style={styles.title}>Habits</Text>
      <View style={styles.textRow}>
        <Text style={styles.bold}>Completed: {finishedHabitCount}</Text>
        <Text style={styles.bold}>
          Percent Complete: {habitPercentComplete}%
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.bold}>Remaining</Text>
        <Text style={styles.bold}>Finished</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.rowContainer}>
        <HabitScroll habits={remainingHabits} />
        <HabitScroll habits={finishedHabits} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    width: '100%',
  },
  rowContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bulletHabit: {
    marginVertical: 5,
  },
  habitCard: {
    aspectRatio: 6 / 5,
  },
  habitScroll: {
    aspectRatio: 1,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '90%',
    backgroundColor: Colors.dark.mutedText,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
