import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ChartContainer } from '../components/ChartContainer';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import { MoodPercentage } from '../components/MoodPercentage';
import TutorialModal from '../components/TutorialModals/TutorialModal';
import { Colors } from '../constants';
import { RootState } from '../redux/store';
import { HabitType, IDayType, IHabitType } from '../types';
import { getDaysPastWeek } from '../utils/day';
import { getHabitIds, getHabitsFromIdsAsArray, getNonDeletedHabits } from '../utils/habit';

export function HomeScreen() {
  const days = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  );
  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );
  console.log('habbb', habits)

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
  }, [habits, days]);

  function getDataForPastWeek() {
    setStartDate(DateTime.now().minus({ week: 1 }).toISODate());
    setEndDate(DateTime.now().toISODate());
    setDaysPastWeek(getDaysPastWeek(days));
    setLoading(false);
  }

  function setHabits() {
    const nonDeletedHabits = getNonDeletedHabits(habits)
    const finishedHabits = getHabitsFromIdsAsArray(
      nonDeletedHabits,
      getHabitIds(nonDeletedHabits, true)
    );
    const remainingHabits = getHabitsFromIdsAsArray(
      nonDeletedHabits,
      getHabitIds(nonDeletedHabits, false)
    );
    setFinishedHabits(finishedHabits);
    setRemainingHabits(remainingHabits);
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
      <MoodPercentage
        days={daysPastWeek}
        startDate={startDate}
        endDate={endDate}
      />
      <ChartContainer
        days={daysPastWeek}
        habits={habits}
        startDate={startDate}
        endDate={endDate}
        selectedHabitId={'top3'}
        selectedMood={'all'}
      />
      <TutorialModal />
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
