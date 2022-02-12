import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import Colors from '../../constants/Colors';
import { MoodToColor } from '../../constants/MoodToColor';
import { IDayType } from '../../types';
import { getMoodCountTotal } from '../../utils/mood';

export function Pie({
  day,
}: {
  day: IDayType;
}) {
  // Initialization to 0 required for animation
  const [pieChartData, setPieChartData] = useState([
    { x: 'Great', y: 0 },
    { x: 'Okay', y: 0 },
    { x: 'Not Good', y: 0 },
  ]);

  useEffect(() => {
    const happyMoodFrequencies = getMoodCountTotal(day, 'Great');
    const neutralMoodFrequencies = getMoodCountTotal(day, 'Okay');
    const sadMoodFrequencies = getMoodCountTotal(day, 'Not Good');

    const tempPieChartdata = [
      { mood: 'Great', frequency: happyMoodFrequencies },
      { mood: 'Okay', frequency: neutralMoodFrequencies },
      { mood: 'Not Good', frequency: sadMoodFrequencies },
    ]
    setPieChartData([
      { x: 'Great', y: happyMoodFrequencies },
      { x: 'Okay', y: neutralMoodFrequencies },
      { x: 'Not Good', y: sadMoodFrequencies },
    ]);
    console.log('day', day)
  }, []);

  // TODO: set an aspect ratio for the whole project in Redux that adapts to the screen size
  const aspectRatio =
    Dimensions.get('screen').height / Dimensions.get('screen').width;

  return (
    <VictoryPie
      data={pieChartData}
      colorScale={[Colors.happyGreen, Colors.neutralYellow, Colors.sadRed]}
      style={{
        labels: {
          // FIXME: fix typescript
          fill: ({ datum }) =>
            datum.frequency > 0 ? MoodToColor[datum.mood] : null,
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
