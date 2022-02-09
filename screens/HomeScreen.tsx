import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ChartContainer } from '../components/ChartContainer';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import { Colors } from '../constants';
import { RootState } from '../redux/store';
import { DayType, HabitType, IDayType, IHabitType } from '../types';
import { getDaysInTimeRange } from '../utils/day';

export function HomeScreen() {
  const days = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  );
  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );
  const today = useSelector<RootState, DayType>(
    (state) => state.dayReducer.today
  );

  const [daysPastWeek, setDaysPastWeek] = useState<IDayType>({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataForPastWeek();
    setHabits();
    console.log('today', today.habitPercentComplete, today.habitCount)
  }, [today]);

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
    const todayFinishedHabits = today.finishedHabitIds.map((id) => habits[id]);
    const todayRemainingHabits = today.remainingHabitIds.map((id) => habits[id]);
    setFinishedHabits(todayFinishedHabits);
    setRemainingHabits(todayRemainingHabits);
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
        habitCount={today.habitCount}
        habitPercentComplete={today.habitPercentComplete}
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
