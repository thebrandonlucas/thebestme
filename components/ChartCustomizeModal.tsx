import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { v4 as uuidv4 } from 'uuid';
import { MoodToColor } from '../constants/MoodToColor';
import { IDayType, IHabitType, ValidMood } from '../types';
import Close from './Icons/Close';
import { Card, Text } from './Themed';

export default function ChartCustomizeModal({
  days,
  habits,
  startDate,
  endDate,
  selectedHabitId,
  selectedMood,
  isVisible,
  onChangeStartDate,
  onChangeEndDate,
  setSelectedHabitId,
  setSelectedMood,
  closeModal,
}: {
  days: IDayType;
  habits: IHabitType;
  startDate: string;
  endDate: string;
  selectedHabitId: string | 'top3';
  selectedMood: ValidMood | 'all';
  isVisible: boolean;
  onChangeStartDate: (event: any, selectedDate: Date) => void;
  onChangeEndDate: (event: any, selectedDate: Date) => void;
  setSelectedHabitId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMood: React.Dispatch<React.SetStateAction<ValidMood | 'all'>>;
  closeModal: () => void;
}) {
  const moods = ['Great', 'Okay', 'Not Good'];

  return (
    <Modal
      isVisible={isVisible}
      // onBackdropPress={closeModal}
      // onSwipeComplete={closeModal}
      // swipeDirection="down"
      avoidKeyboard
      style={styles.modal}
    >
      <Card style={styles.card}>
        <TouchableOpacity onPress={closeModal}><Close /></TouchableOpacity>
        
        <Text style={styles.title}>Customize Chart Data{'\n\n'}</Text>
        {/* <ScrollView> */}

        <Text style={styles.title}>Start Date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          // FIXME: center pickers! How?
          // style={{marginHorizontal: '40%'}}
          value={DateTime.fromISO(startDate).toJSDate()}
          // FIXME: 'datetime' only available on ios
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeStartDate}
        />
        <Text style={styles.title}>End Date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          // FIXME: center pickers! How?
          // style={{marginHorizontal: '40%'}}
          value={DateTime.fromISO(endDate).toJSDate()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeEndDate}
        />
        <Text style={styles.title}>Mood</Text>
        <Picker
          selectedValue={selectedMood}
          onValueChange={(itemValue) => setSelectedMood(itemValue)}
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

        <Text style={styles.title}>Habit</Text>
        <Picker
          selectedValue={selectedHabitId}
          onValueChange={(itemValue) => setSelectedHabitId(itemValue)}
        >
          <Picker.Item color="white" label="Top 3 Habits" value="top3" />
          {Object.keys(habits).map((habitId) => (
            <Picker.Item
              key={uuidv4()}
              color="white"
              label={habits[habitId].text}
              value={habitId}
            />
          ))}
        </Picker>
        {/* </ScrollView> */}
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: '20%',
  },
  card: {
    height: '90%',
  },
  journalHeaderLabel: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
