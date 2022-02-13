import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import Colors from '../../constants/Colors';
import { MoodToColor } from '../../constants/MoodToColor';
import { IDayType } from '../../types';
import { getMoodCountTotal } from '../../utils/mood';
import { Text } from '../Themed';

export function Pie({ day }: { day: IDayType }) {
  // Initialization to 0 required for animation
  const [pieChartData, setPieChartData] = useState([
    { x: 'Great', y: 100 },
    { x: 'Okay', y: 0 },
    { x: 'Not Good', y: 0 },
  ]);

  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    const happyMoodCount = getMoodCountTotal(day, 'Great');
    const neutralMoodCount = getMoodCountTotal(day, 'Okay');
    const sadMoodCount = getMoodCountTotal(day, 'Not Good');

    if (happyMoodCount + neutralMoodCount + sadMoodCount === 0) {
      setIsDataEmpty(true);
    }

    setPieChartData([
      { x: 'Great', y: happyMoodCount },
      { x: 'Okay', y: neutralMoodCount },
      { x: 'Not Good', y: sadMoodCount },
    ]);
  }, [day]);

  // TODO: set an aspect ratio for the whole project in Redux that adapts to the screen size
  const aspectRatio =
    Dimensions.get('screen').height / Dimensions.get('screen').width;

  return isDataEmpty ? (
    <Text>That aint good</Text>
  ) : (
    <VictoryPie
      data={pieChartData}
      colorScale={[Colors.happyGreen, Colors.neutralYellow, Colors.sadRed]}
      style={{
        labels: {
          // FIXME: fix typescript
          fill: ({ datum }) => (datum.y > 0 ? MoodToColor[datum.x] : null),
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
