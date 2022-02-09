import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ChartContainer } from '../components/ChartContainer';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import { Colors } from '../constants';
import { RootState } from '../redux/store';
import { HabitType, IDayType, IHabitType } from '../types';
import { getDaysInTimeRange } from '../utils/day';

export function HomeScreen() {
  const days = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  );
  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );

  const today = DateTime.now().toISODate();

  const [daysPastWeek, setDaysPastWeek] = useState<IDayType>({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [habitCount, setHabitCount] = useState(0);
  const [habitPercentComplete, setHabitPercentComplete] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataForPastWeek();
    setHabits();
  }, []);

  function getDataForPastWeek() {
    const tempStartDate = DateTime.now().minus({ week: 1 }).toISODate();
    const tempEndDate = DateTime.now().toISODate();
    const selectedDays = getDaysInTimeRange(days, tempStartDate, tempEndDate);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setDaysPastWeek(selectedDays);
    setLoading(false);
  }

  function setHabits() {
    const todayFinishedHabits = days[today].finishedHabitIds.map(
      (id) => habits[id]
    );
    const todayRemainingHabits = days[today].remainingHabitIds.map(
      (id) => habits[id]
    );
    setFinishedHabits(todayFinishedHabits);
    setRemainingHabits(todayRemainingHabits);
    // setHabitCount(todayFinishedHabits ? todayFinishedHabits.length : 0)
    // setHabitPercentComplete()
  }

  return loading ? (
    <ActivityIndicator
      style={styles.spinner}
      size="large"
      color={Colors.happyGreen}
    />
  ) : (
    <ScrollView>
      <HabitSummaryCard
        remainingHabits={remainingHabits}
        finishedHabits={finishedHabits}
        habitCount={days[today].habitCount}
        habitPercentComplete={days[today].habitPercentComplete}
      />

      <ChartContainer
        days={daysPastWeek}
        habits={habits}
        startDate={startDate}
        endDate={endDate}
        selectedHabitId={'top3'}
        selectedMood={'all'}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
