import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import Colors from '../../constants/Colors';
import { MoodToColor } from '../../constants/MoodToColor';
import { IDayType, ValidMood } from '../../types';
import { getDaysInTimeRange } from '../../utils/day';
import { getMoodFrequency } from '../../utils/mood';
import { Text } from '../Themed';

export function PieMoods({
  days,
  startDate,
  endDate,
}: {
  days: IDayType;
  startDate: string;
  endDate: string;
}) {
  // Initialization to 0 required for animation
  const [pieChartData, setPieChartData] = useState([
    { mood: 'Great', frequency: 0 },
    { mood: 'Okay', frequency: 0 },
    { mood: 'Not Good', frequency: 0 },
  ]);

  useEffect(() => {
    configurePieChart();
  }, [days, startDate, endDate]);

  function configurePieChart() {
    const selectedDays = getDaysInTimeRange(days, startDate, endDate);
    const happyMoodFrequency = getMoodFrequency(selectedDays, 'Great');
    const neutralMoodFrequency = getMoodFrequency(selectedDays, 'Okay');
    const sadMoodFrequency = getMoodFrequency(selectedDays, 'Not Good');
    const moodFrequencies = [
      happyMoodFrequency,
      neutralMoodFrequency,
      sadMoodFrequency,
    ];
    setPieChartData(moodFrequencies);
  }
  // TODO: set an aspect ratio for the whole project in Redux that adapts to the screen size
  const aspectRatio =
    Dimensions.get('screen').height / Dimensions.get('screen').width;

  if (
    !pieChartData.length ||
    (pieChartData[0].frequency === 0 &&
      pieChartData[1].frequency === 0 &&
      pieChartData[2].frequency === 0)
  ) {
    return <Text>No mood data to show for pie chart given selected days</Text>;
  } else {
    return (
      <VictoryPie
        data={pieChartData}
        x="mood"
        y="frequency"
        colorScale={[Colors.happyGreen, Colors.neutralYellow, Colors.sadRed]}
        style={{
          labels: {
            // FIXME: fix typescript
            fill: ({ datum }) => datum.frequency > 0 ? MoodToColor[datum.mood] : null,
            fontSize: 15,
            fontWeight: 'bold',
          },
          border: { color: 'red', width: 1 },
        }}
        width={Dimensions.get('screen').width}
        height={aspectRatio * 135}
        innerRadius={65}
        animate={{ easing: 'exp' }}
      />
    );
  }
}
