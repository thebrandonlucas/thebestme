import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import Colors from '../../constants/Colors';
import { MoodToColor } from '../../constants/MoodToColor';
import { IDayType } from '../../types';

export function Pie({
  day,
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
    // configurePieChart();
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
