import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { MoodToColor } from '../../constants/MoodToColor';
import { DayType, IDayType, ValidMood } from '../../types';
import { getPercentage } from '../../utils';
import { getDaysInTimeRange } from '../../utils/day';
import { getMoodCountTotal, getMoodFrequency } from '../../utils/mood';
import { Text } from '../Themed';

/**
 * Gets the percentage occurrence for each mood for a single day
 * @returns 
 */
export function MoodPercentages({
  day,

}: {
  day: IDayType;

}): JSX.Element {
  const [happyMoodPercentage, setHappyMoodPercentage] = useState(0);
  const [neutralMoodPercentage, setNeutralMoodPercentage] = useState(0);
  const [sadMoodPercentage, setSadMoodPercentage] = useState(0);

  useEffect(() => {
    configureMoodPercentages();
  }, [day]);

  function configureMoodPercentages() {
    const happyMoodCount = getMoodCountTotal(day, 'Great');
    const neutralMoodCount = getMoodCountTotal(day, 'Okay');
    const sadMoodCount = getMoodCountTotal(day, 'Not Good');
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
      <Text style={{ color: MoodToColor[mood] }}>
        {mood} {percentage}%{'\n'}
      </Text>
    );
  }

  return (
    <>
      <Text style={styles.moodPercentage}>
        Your moods this day were
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
