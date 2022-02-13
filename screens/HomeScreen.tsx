import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ChartContainer } from '../components/ChartContainer';
import { Pie } from '../components/Charts/Pie';
import { HabitSummaryCard } from '../components/HabitSummaryCard';
import { MoodPercentages } from '../components/MoodPercentages/MoodPercentages';
import { MoodPercentageOverall } from '../components/MoodPercentages/MoodPercentagesOverall';
import { Text } from '../components/Themed';
import TutorialModal from '../components/TutorialModals/TutorialModal';
import { Colors } from '../constants';
import { RootState } from '../redux/store';
import { HabitType, IDayType, IHabitType } from '../types';
import getDateString, { getPercentage } from '../utils';
import { getDaysPastWeek } from '../utils/day';
import {
  getHabitIds,
  getHabitsFromIdsAsArray,
  getNonDeletedHabits,
} from '../utils/habit';

export function HomeScreen() {
  const days = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  );
  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );
  const dateToday = DateTime.now().toISODate();
  const currentIDay: IDayType = { [dateToday]: days[dateToday] };

  const [daysPastWeek, setDaysPastWeek] = useState<IDayType>({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [habitCount, setHabitCount] = useState(0);
  const [habitPercentComplete, setHabitPercentComplete] = useState(0);
  const [finishedHabits, setFinishedHabits] = useState<HabitType[]>([]);
  const [remainingHabits, setRemainingHabits] = useState<HabitType[]>([]);
  const [pastWeekDataViewable, setpastWeekDataViewable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataForPastWeek();
    setHabits();
  }, [habits, days]);

  function getDataForPastWeek() {
    setStartDate(DateTime.now().minus({ week: 1 }).toISODate());
    setEndDate(DateTime.now().toISODate());
    setDaysPastWeek(getDaysPastWeek(days));
    if (Object.keys(days).length >= 7) {
      setpastWeekDataViewable(true);
    }
    setLoading(false);
  }

  function setHabits() {
    const nonDeletedHabits = getNonDeletedHabits(habits);
    const finishedHabits = getHabitsFromIdsAsArray(
      nonDeletedHabits,
      getHabitIds(nonDeletedHabits, true)
    );
    const remainingHabits = getHabitsFromIdsAsArray(
      nonDeletedHabits,
      getHabitIds(nonDeletedHabits, false)
    );
    const habitCount = finishedHabits.length + remainingHabits.length;
    const habitPercentComplete = getPercentage(
      finishedHabits.length,
      habitCount
    );
    setHabitCount(habitCount);
    setHabitPercentComplete(habitPercentComplete);
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
      <Text style={[styles.mainText, { color: Colors.themeColor }]}>
        {getDateString(DateTime.now().toISODate()).date}
      </Text>
      <HabitSummaryCard
        remainingHabits={remainingHabits}
        finishedHabits={finishedHabits}
        habitCount={habitCount}
        habitPercentComplete={habitPercentComplete}
      />

      {/* Today's data */}
      <Pie day={days} />
      <MoodPercentages day={currentIDay} />

      {/* Past week data */}
      {pastWeekDataViewable ? (
        <>
          <MoodPercentageOverall
            days={daysPastWeek}
            startDate={startDate}
            endDate={endDate}
            customDateRangeText="for the past week:"
          />
          <ChartContainer
            days={daysPastWeek}
            habits={habits}
            startDate={startDate}
            endDate={endDate}
            selectedHabitId={'top3'}
            selectedMood={'all'}
          />{' '}
        </>
      ) : (
        <Text style={styles.mainText}>
          Check back in {7 - Object.keys(days).length} days to see weekly
          insights!
        </Text>
      )}

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
  mainText: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
});
