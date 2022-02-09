import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { ChartContainer } from '../components/ChartContainer';
import { Text } from '../components/Themed';
import { RootState } from '../redux/store';
import { IDayType, IHabitType } from '../types';
import { getDaysInTimeRange } from '../utils/day';

export function HomeScreen() {
  const days = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  );
  const habits = useSelector<RootState, IHabitType>(
    (state) => state.habitReducer.habits
  );

  const [daysPastWeek, setDaysPastWeek] = useState<IDayType>({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataForPastWeek();
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

  return (
    <>
      <Text>adf;jl</Text>
      {!loading && (
        <ScrollView>
          <ChartContainer
            days={daysPastWeek}
            habits={habits}
            startDate={startDate}
            endDate={endDate}
            selectedHabitId={'top3'}
            selectedMood={'all'}
          />
        </ScrollView>
      )}
    </>
  );
}
