import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ChartContainer } from '../components/ChartContainer';
import { Calendar, Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { MoodToColor } from '../constants/MoodToColor';
import { selectDay } from '../redux/actions/DayActions';
import {
  CalendarDataType,
  ICalendarDataType,
  IDayType,
  IHabitType,
  ValidMood,
} from '../types';
import getDateString, { getDateFromISOString } from '../utils';
import getCalendarData from '../utils/getCalendarData';
import { getMoodMode } from '../utils/mood';

function DataScreen({ habits, days, navigation }) {
  const currentDate = DateTime.now().toISODate();
  const formattedDate = getDateString(currentDate).date;
  const isoDate = getDateFromISOString(currentDate);

  const [calendarData, setCalendarData] = useState<CalendarDataType>({});
  const [selectedDay, setSelectedDay] = useState(DateTime.now().toISODate());
  const [moodMode, setMoodMode] = useState('');
  const [selectedMood, setSelectedMood] = useState<ValidMood | 'all'>('all');
  const [selectedHabitId, setSelectedHabitId] = useState<string>('top3');
  const [startDate, setStartDate] = useState<string>(Object.keys(days)[0]);
  const [endDate, setEndDate] = useState<string>(DateTime.now().toISODate());
  const moods = ['Great', 'Okay', 'Not Good'];

  const dispatch = useDispatch();

  useEffect(() => {
    let tempCalendarData: ICalendarDataType = getCalendarData(
      days,
      selectedDay
    );
    setCalendarData(tempCalendarData);

    if (days[selectedDay]) {
      const tempMoodMode = getMoodMode(days[selectedDay].mood);
      setMoodMode(tempMoodMode);
    }
  }, [days, selectedDay]);

  function goToDayMetricsScreen() {
    navigation.navigate('DayMetricsScreen', { selectedDay });
  }

  function handleSelectDayButtonPress(day) {
    const dateString = day.dateString;
    setSelectedDay(dateString);
    dispatch(selectDay(dateString));
  }

  // Datetime picker stuff
  function onChangeStartDate(event, selectedDate: Date) {
    setStartDate(DateTime.fromJSDate(selectedDate).toISODate());
  }
  function onChangeEndDate(event, selectedDate: Date) {
    setEndDate(DateTime.fromJSDate(selectedDate).toISODate());
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.date, { color: Colors.themeColor }]}>
          {formattedDate}
        </Text>
        <Calendar
          style={styles.calendar}
          markingType="period"
          markedDates={calendarData}
          current={isoDate}
          onDayPress={handleSelectDayButtonPress}
        />
        <Card style={styles.cardContainer}>
          {days[selectedDay] ? (
            <>
              <Text style={styles.title}>
                Most common mood:{' '}
                <Text style={[{ color: MoodToColor[moodMode] }]}>
                  {moodMode}
                </Text>
              </Text>
              <Text style={styles.title}>
                Habits Completed: {days[selectedDay].finishedHabitCount} /{' '}
                {days[selectedDay].habitCount},{' '}
                {days[selectedDay].habitPercentComplete}%
              </Text>
              <Button onPress={goToDayMetricsScreen} title="View Details" />
            </>
          ) : (
            <Text style={styles.title}>No data to display</Text>
          )}
        </Card>
        {/* <ChartContainer
          days={days}
          habits={habits}
          startDate={'2021-01-01'}
          endDate={'2021-01-10'}
          selectedHabitId={'top3'}
          selectedMood={'all'}
        />
        <Text>Start Date/Time</Text>
        <DateTimePicker
          testID="dateTimePicker"
          // FIXME: center pickers! How?
          // style={{marginHorizontal: '40%'}}
          value={DateTime.fromISO(startDate).toJSDate()}
          // FIXME: 'datetime' only available on ios
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChangeStartDate}
        />
        <Text>End Date/Time</Text>
        <DateTimePicker
          testID="dateTimePicker"
          // FIXME: center pickers! How?
          // style={{marginHorizontal: '40%'}}
          value={DateTime.fromISO(endDate).toJSDate()}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChangeEndDate}
        />
        <Text>Mood</Text>
        <Picker
          selectedValue={selectedMood}
          onValueChange={(itemValue, itemIndex) => setSelectedMood(itemValue)}
        >
          <Picker.Item color="white" label="All" value="all" />
          {moods.map((mood) => (
            <Picker.Item
              key={uuidv4()}
              color={MoodToColor[mood]}
              label={mood}
              value={mood}
            />
          ))}
        </Picker>

        <Text>Habit</Text>
        <Picker
          selectedValue={selectedHabitId}
          onValueChange={(itemValue) => setSelectedHabitId(itemValue)}
        >
          <Picker.Item color="white" label="Top 3 Habits" value="top3" />
          {Object.keys(habits).map((habitId) => (
            <Picker.Item
              color="white"
              label={habits[habitId].text}
              value={habitId}
            />
          ))}
        </Picker> */}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state: { dayReducer; habitReducer }) => {
  const { days }: IDayType = state.dayReducer;
  const { habits }: IHabitType = state.habitReducer;
  return { days, habits };
};
export default connect(mapStateToProps)(DataScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  calendar: {
    width: '100%',
    aspectRatio: 1,
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 2 / 1,
    justifyContent: 'space-around',
  },
  label: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
