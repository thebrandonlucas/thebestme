import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ThemeButton from '../components/ThemeButton';
import { Text, View } from '../components/Themed';
import { RootState } from '../redux/store';
import { EndOfDayNotesEntryType } from '../types';

function EndOfDayNotesScreen({ navigation }) {
  const selectedDay = useSelector<RootState, string>(
    (state) => state.dayReducer.selectedDay
  );
  console.log('selected', selectedDay);

  const endOfDayNotes = useSelector<RootState, EndOfDayNotesEntryType[]>(
    (state) => state.dayReducer.days[selectedDay].endOfDayNotes
  );
  console.log('end', endOfDayNotes);
  // const [endOfDayNotes, setEndOfDayNotes] = useState<EndOfDayNotesEntryType[]>();
  // const { selectedDay } = route.params.selectedDay;
  // console.log('se', selectedDay)
  //
  useEffect(() => {
    // setEndOfDayNotes(
    // );
  }, []);

  function goBack() {
    navigation.goBack();
  }

  return (
    <View>
      <Text>{selectedDay}</Text>
      {endOfDayNotes.map((text) => {
        return <Text>{text}</Text>;
      })}
      <ThemeButton title="Go Back" onPress={goBack} />
    </View>
  );
}

export default EndOfDayNotesScreen;

const styles = StyleSheet.create({});
