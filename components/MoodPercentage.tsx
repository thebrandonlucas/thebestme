import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { MoodToColor } from '../constants/MoodToColor';
import { IDayType, ValidMood } from '../types';
import { getPercentage } from '../utils';
import { getDaysInTimeRange } from '../utils/day';
import { getMoodFrequency } from '../utils/mood';
import { Text } from './Themed';

export function MoodPercentage({
  days,
  customDateRangeText,
  startDate,
  endDate,
}: {
  days: IDayType;
  customDateRangeText?: string;
  startDate: string;
  endDate: string;
}): JSX.Element {
  const [happyMoodPercentage, setHappyMoodPercentage] = useState(0);
  const [neutralMoodPercentage, setNeutralMoodPercentage] = useState(0);
  const [sadMoodPercentage, setSadMoodPercentage] = useState(0);
  const [dateRangeText, setDateRangeText] = useState('');

  useEffect(() => {
    configureMoodPercentages();
    setDateRangeText(
      customDateRangeText
        ? customDateRangeText
        : 'between ' + startDate + ' and ' + endDate + ' was'
    );
  }, [days, startDate, endDate]);

  function configureMoodPercentages() {
    const selectedDays = getDaysInTimeRange(days, startDate, endDate);
    const happyMoodCount = getMoodFrequency(selectedDays, 'Great').frequency;
    const neutralMoodCount = getMoodFrequency(selectedDays, 'Okay').frequency;
    const sadMoodCount = getMoodFrequency(selectedDays, 'Not Good').frequency;
    const totalMoodCount = happyMoodCount + neutralMoodCount + sadMoodCount;

    const happyMoodPercentage = getPercentage(happyMoodCount, totalMoodCount);
    const neutralMoodPercentage = getPercentage(
      neutralMoodCount,
      totalMoodCount
    );
    const sadMoodPercentage = getPercentage(sadMoodCount, totalMoodCount);

    setHappyMoodPercentage(happyMoodPercentage);
    setNeutralMoodPercentage(neutralMoodPercentage);
    setSadMoodPercentage(sadMoodPercentage);
  }

  function MoodPercentage({
    mood,
    percentage,
  }: {
    mood: ValidMood;
    percentage: number;
  }): JSX.Element {
    return (
      <Text style={{color: MoodToColor[mood]}}>
        {mood} {percentage}%
        {'\n'}
      </Text>
      
    );
  }

  return (
    <>
      <Text style={styles.moodPercentage}>
        Your overall mood {dateRangeText}
        {'\n'}
        <MoodPercentage mood="Great" percentage={happyMoodPercentage} />
        <MoodPercentage mood="Okay" percentage={neutralMoodPercentage} />
        <MoodPercentage mood="Not Good" percentage={sadMoodPercentage} />
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  moodPercentage: {
    fontSize: 20,
  },
});
