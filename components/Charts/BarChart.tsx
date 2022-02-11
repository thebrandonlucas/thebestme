import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { ColorScalePropType } from 'victory-core';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
} from 'victory-native';
import Colors from '../../constants/Colors';
import { HabitFrequency, IDayType, IHabitType, ValidMood } from '../../types';
import { getDaysInTimeRange } from '../../utils/day';
import {
  getColorScale,
  replaceHabitFrequencyIdsWithText,
} from '../../utils/graph';
import {
  getHabitFrequencyForMoodInTimeRange,
  getTopHabitFrequenciesPerMood,
} from '../../utils/habit';
import { Text } from '../Themed';

export function BarChart({
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
  const [barChartDataHappy, setBarChartDataHappy] = useState<HabitFrequency[]>(
    []
  );
  const [barChartDataNeutral, setBarChartDataNeutral] = useState<
    HabitFrequency[]
  >([]);
  const [barChartDataSad, setBarChartDataSad] = useState<HabitFrequency[]>([]);
  const [barChartColorScale, setBarChartColorScale] =
    useState<ColorScalePropType>([]);

  useEffect(() => {
    configureBarChart();
  }, [selectedHabitId, selectedMood, startDate, endDate]);

  function configureBarChart() {
    // TODO: allow the user to configure remaining habits as well as finished habits
    const selectedDays = getDaysInTimeRange(
      days,
      // TODO: change these to ISO date immediately in setState
      startDate,
      endDate
    );

    const tempHabits =
      selectedHabitId === 'top3'
        ? habits
        : { [selectedHabitId]: habits[selectedHabitId] };

    setBarChartColorScale(getColorScale(selectedMood));
    let habitFrequencies: HabitFrequency[];
    if (selectedMood !== 'all') {
      if (selectedHabitId === 'top3') {
        habitFrequencies = replaceHabitFrequencyIdsWithText(
          getTopHabitFrequenciesPerMood(
            selectedDays,
            tempHabits,
            3,
            selectedMood
          ),
          habits
        );
      } else {
        habitFrequencies = replaceHabitFrequencyIdsWithText(
          [
            getHabitFrequencyForMoodInTimeRange(
              selectedHabitId,
              selectedDays,
              selectedMood
            ),
          ],
          habits
        );
      }
    }
    switch (selectedMood) {
      case 'Great':
        setBarChartDataHappy(habitFrequencies);
        setBarChartDataNeutral([]);
        setBarChartDataSad([]);
        break;
      case 'Okay':
        setBarChartDataNeutral(habitFrequencies);
        setBarChartDataHappy([]);
        setBarChartDataSad([]);
        break;
      case 'Not Good':
        setBarChartDataSad(habitFrequencies);
        setBarChartDataHappy([]);
        setBarChartDataNeutral([]);
        break;
      default:
        if (selectedHabitId !== 'top3') {
          setBarChartDataHappy(
            replaceHabitFrequencyIdsWithText(
              [
                getHabitFrequencyForMoodInTimeRange(
                  selectedHabitId,
                  selectedDays,
                  'Great'
                ),
              ],
              habits
            )
          );
          setBarChartDataNeutral(
            replaceHabitFrequencyIdsWithText(
              [
                getHabitFrequencyForMoodInTimeRange(
                  selectedHabitId,
                  selectedDays,
                  'Okay'
                ),
              ],
              habits
            )
          );
          setBarChartDataSad(
            replaceHabitFrequencyIdsWithText(
              [
                getHabitFrequencyForMoodInTimeRange(
                  selectedHabitId,
                  selectedDays,
                  'Not Good'
                ),
              ],
              habits
            )
          );
        } else {
          setBarChartDataHappy(
            replaceHabitFrequencyIdsWithText(
              getTopHabitFrequenciesPerMood(selectedDays, habits, 3, 'Great'),
              habits
            )
          );
          setBarChartDataNeutral(
            replaceHabitFrequencyIdsWithText(
              getTopHabitFrequenciesPerMood(selectedDays, habits, 3, 'Okay'),
              habits
            )
          );
          setBarChartDataSad(
            replaceHabitFrequencyIdsWithText(
              getTopHabitFrequenciesPerMood(
                selectedDays,
                habits,
                3,
                'Not Good'
              ),
              habits
            )
          );
        }
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
    barChartDataHappy.length === 0 &&
    barChartDataNeutral.length === 0 &&
    barChartDataSad.length === 0
  ) {
    return (
      <Text>
        No mood data to show for bar chart given selected days, mood(s), and
        habit(s)
      </Text>
    );
  }

  return (
    <>
      <VictoryChart theme={barChartStyle} domainPadding={{ x: 50 }}>
        <VictoryAxis dependentAxis tickFormat={(t) => Math.round(t)} />
        <VictoryAxis />
        <VictoryGroup
          colorScale={barChartColorScale}
          offset={20}
          style={{ data: { width: 15 } }}
        >
          <VictoryBar x="habit" y="frequency" data={barChartDataHappy} />
          <VictoryBar x="habit" y="frequency" data={barChartDataNeutral} />
          <VictoryBar x="habit" y="frequency" data={barChartDataSad} />
        </VictoryGroup>
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
