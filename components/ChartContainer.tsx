import React from 'react';
import { IDayType, IHabitType, ValidMood } from '../types';
import { View } from './Themed';
import { BarChart } from './Charts/BarChart';
import { LineChart } from './Charts/LineChart';
import { Pie } from './Charts/Pie';

export function ChartContainer({
  days,
  habits,
  startDate,
  endDate,
  selectedHabitId,
  selectedMood,
}: {
  days: IDayType;
  habits: IHabitType;
  startDate: string;
  endDate: string;
  selectedHabitId: string | 'top3';
  selectedMood: ValidMood | 'all';
}) {
  return (
    <View>
      <Pie days={days} startDate={startDate} endDate={endDate} />
      <BarChart
        days={days}
        habits={habits}
        startDate={startDate}
        endDate={endDate}
        selectedHabitId={selectedHabitId}
        selectedMood={selectedMood}
      />
      <LineChart
        days={days}
        startDate={startDate}
        endDate={endDate}
        selectedMood={selectedMood}
      />
    </View>
  );
}
