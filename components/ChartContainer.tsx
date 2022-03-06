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
  selectedCharts,
}: {
  days: IDayType;
  habits: IHabitType;
  startDate: string;
  endDate: string;
  selectedHabitId: string | 'top3';
  selectedMood: ValidMood | 'all';
  selectedCharts: {
    pie?: ValidMood | 'all';
    line?: ValidMood | 'all';
    bar?: ValidMood | 'all';
  };
}) {
  return (
    <View>
      {selectedCharts.pie && (
        <PieMoods days={days} startDate={startDate} endDate={endDate} />
      )}
      {selectedCharts.bar && (
        <BarChart
          days={days}
          habits={habits}
          startDate={startDate}
          endDate={endDate}
          selectedHabitId={selectedHabitId}
          selectedMood={selectedMood}
        />
      )}
      {selectedCharts.line && (
        <LineChart
          days={days}
          startDate={startDate}
          endDate={endDate}
          selectedMood={
            selectedCharts.line ? selectedCharts.line : selectedMood
          }
        />
      )}
    </View>
  );
}
