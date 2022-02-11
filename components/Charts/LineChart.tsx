import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
} from 'victory-native';
import Colors from '../../constants/Colors';
import { FrequencyByDate, IDayType, ValidMood } from '../../types';
import { getDaysInTimeRange } from '../../utils/day';
import { getMoodFrequencyByDates } from '../../utils/mood';
import { Text } from '../Themed';

export function LineChart({
  days,
  startDate,
  endDate,
  selectedMood,
}: {
  days: IDayType;
  startDate: string;
  endDate: string;
  selectedMood: ValidMood | 'all';
}) {
  const [happyLineChartData, setHappyLineChartData] =
    useState<FrequencyByDate[]>([]);
  const [neutralLineChartData, setNeutralLineChartData] =
    useState<FrequencyByDate[]>([]);
  const [sadLineChartData, setSadLineChartData] = useState<FrequencyByDate[]>([]);

  useEffect(() => {
    configureLineChart();
  }, [days, startDate, endDate, selectedMood]);

  function configureLineChart() {
    // TODO: allow the user to configure remaining habits as well as finished habits
    const selectedDays = getDaysInTimeRange(
      days,
      // TODO: change these to ISO date immediately in setState
      startDate,
      endDate
    );

    let moodFrequencies: FrequencyByDate[];
    if (selectedMood !== 'all') {
      moodFrequencies = getMoodFrequencyByDates(selectedDays, selectedMood);
    }
    switch (selectedMood) {
      case 'Great':
        setHappyLineChartData(moodFrequencies);
        setNeutralLineChartData([]);
        setSadLineChartData([]);
        break;
      case 'Okay':
        setNeutralLineChartData(moodFrequencies);
        setHappyLineChartData([]);
        setSadLineChartData([]);
        break;
      case 'Not Good':
        setSadLineChartData(moodFrequencies);
        setHappyLineChartData([]);
        setNeutralLineChartData([]);
        break;
      default:
        setHappyLineChartData(getMoodFrequencyByDates(selectedDays, 'Great'));
        setNeutralLineChartData(getMoodFrequencyByDates(selectedDays, 'Okay'));
        setSadLineChartData(getMoodFrequencyByDates(selectedDays, 'Not Good'));
        break;
    }
  }

  const barChartStyle = {
    axis: {
      style: {
        tickLabels: {
          // this changed the color of my numbers to white
          fill: 'white',
        },
      },
    },
  };

  if (
    happyLineChartData.length === 0 &&
    neutralLineChartData.length === 0 &&
    sadLineChartData.length === 0
  ) {
    return (
      <Text>
        No mood data to show for line chart given selected days and mood(s)
      </Text>
    );
  }
  return (
    <>
      <VictoryChart theme={barChartStyle} scale={'time'}>
        <VictoryAxis dependentAxis tickFormat={(t) => Math.round(t)} />
        <VictoryAxis />
        {happyLineChartData && (
          <VictoryLine
            style={{
              data: { stroke: Colors.happyGreen },
              parent: { border: '1px solid #ccc' },
            }}
            x="date"
            y="frequency"
            data={happyLineChartData}
          />
        )}
        {neutralLineChartData && (
          <VictoryLine
            style={{
              data: { stroke: Colors.neutralYellow },
              parent: { border: '1px solid #ccc' },
            }}
            x="date"
            y="frequency"
            data={neutralLineChartData}
          />
        )}
        {sadLineChartData && (
          <VictoryLine
            style={{
              data: { stroke: Colors.sadRed },
              parent: { border: '1px solid #ccc' },
            }}
            x="date"
            y="frequency"
            data={sadLineChartData}
          />
        )}
      </VictoryChart>
      <VictoryLegend
        // style={{ alignItems: 'center', border: { fill: 'red', width: 1 } }}
        width={Dimensions.get('screen').width}
        // TODO: how to dynamically set the height of the legend based on
        height={100}
        // FIXME: Is dividing the screen width by 6 guaranteed to center it?
        x={Dimensions.get('screen').width / 6}
        title="Top 3 habits"
        orientation="horizontal"
        gutter={20}
        centerTitle
        style={{
          title: { fontSize: 20, fill: 'white' },
        }}
        data={[
          {
            name: 'Great',
            symbol: { fill: Colors.happyGreen },
            labels: { fill: Colors.happyGreen },
          },
          {
            name: 'Okay',
            symbol: { fill: Colors.neutralYellow },
            labels: { fill: Colors.neutralYellow },
          },
          {
            name: 'Not Good',
            symbol: { fill: Colors.sadRed },
            labels: { fill: Colors.sadRed },
          },
        ]}
      />
    </>
  );
}
