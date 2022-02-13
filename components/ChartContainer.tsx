import React from 'react';
import { IDayType, IHabitType, ValidMood } from '../types';
import { BarChart } from './Charts/BarChart';
import { LineChart } from './Charts/LineChart';
import { PieMoods } from './Charts/PieMoods';
import { View } from './Themed';

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
      <PieMoods days={days} startDate={startDate} endDate={endDate} />
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
