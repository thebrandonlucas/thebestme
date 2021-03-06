import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import TutorialModal from '../components/TutorialModals/TutorialModal';
import { Colors } from '../constants';
import { saveCbtJournal, updateCbtJournal } from '../redux/actions/CbtActions';
import { setDayInfo } from '../redux/actions/DayActions';
import { RootState } from '../redux/store';
import { CbtJournalEntryType, DayType, IDayType } from '../types';
import getDateString from '../utils';

export function CBTAddScreen({
  route,
  navigation,
  saveCbtJournal,
  updateCbtJournal,
  setDayInfo,
}) {
  const today = useSelector<RootState, IDayType>(
    (state) => state.dayReducer.days
  )[DateTime.now().toISODate()];
  const [cbtId, setCbtId] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [situationText, setSituationText] = useState<string>('');
  const [thoughtsText, setThoughtsText] = useState<string>('');
  const [emotionsText, setEmotionsText] = useState<string>('');
  const [behaviorsText, setBehaviorsText] = useState<string>('');
  const [alternativeThoughtsText, setAlternativeThoughtsText] =
    useState<string>('');
  const [isAddingJournal, setIsAddingJournal] = useState(false);

  useEffect(() => {
    if (route.params !== undefined) {
      setCbtId(route.params.id);
      setDate(getDateString(route.params.date).date);
      setSituationText(route.params.situationText);
      setThoughtsText(route.params.thoughtsText);
      setEmotionsText(route.params.emotionsText);
      setBehaviorsText(route.params.behaviorsText);
      setAlternativeThoughtsText(route.params.alternativeThoughtsText);
    } else {
      setIsAddingJournal(true);
    }
  }, [route]);

  /**
   * Add a new journal entry
   * @param {string} date - ISO datetime string, used as ID for journals
   * @return {void}
   */
  function save(): void {
    // Don't add to firebase if all fields empty
    if (
      situationText.length === 0 &&
      thoughtsText.length === 0 &&
      emotionsText.length === 0 &&
      behaviorsText.length === 0 &&
      alternativeThoughtsText.length === 0
    ) {
      return;
    }

    if (isAddingJournal) {
      const id = uuidv4();
      const entry = {
        [id]: {
          id,
          date: DateTime.now().toISODate(),
          situationText,
          thoughtsText,
          emotionsText,
          behaviorsText,
          alternativeThoughtsText,
        },
      };
      saveCbtJournal(entry);
      const tempCbtIds = [...today.cbtIds, id];
      setDayInfo({ ...today, cbtIds: tempCbtIds });
    } else {
      updateCbtJournal(
        cbtId,
        situationText,
        thoughtsText,
        emotionsText,
        behaviorsText,
        alternativeThoughtsText
      );
      const tempCbtIds = [...today.cbtIds, cbtId];
      setDayInfo({
        ...today,
        cbtIds: tempCbtIds,
      });
    }

    setSituationText('');
    setThoughtsText('');
    setEmotionsText('');
    setBehaviorsText('');
    setAlternativeThoughtsText('');
    setCbtId('');
    setIsAddingJournal(false);
  }

  /**
   * Insert or update (upsert) the entry
   * Close the journal modal
   * @return {void}
   */
  function upsertAndCloseModal() {
    save();
    navigation.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.date, { color: Colors.themeColor }]}>{date}</Text>
        <View style={styles.inputContainer}>
          <Card>
            <TextInputModal
              label="Situation"
              text={situationText}
              setText={setSituationText}
            />
            <TextInputModal
              label="Thoughts"
              text={thoughtsText}
              setText={setThoughtsText}
            />
            <TextInputModal
              label="Emotions"
              text={emotionsText}
              setText={setEmotionsText}
            />
            <TextInputModal
              label="Behaviors"
              text={behaviorsText}
              setText={setBehaviorsText}
            />
            <TextInputModal
              label="Alternative Thoughts"
              text={alternativeThoughtsText}
              setText={setAlternativeThoughtsText}
            />
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <ThemeButton
            title="Save Entry"
            onPress={() => upsertAndCloseModal()}
          />
          <ThemeButton
            title="Past Entries"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <TutorialModal />
    </>
  );
}

const mapStateToProps = (state) => {
  const { days } = state.dayReducer;
  return { days };
};
const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload:
      | DayType
      | CbtJournalEntryType
      | {
          id: string;
          situationText: string;
          thoughtsText: string;
          emotionsText: string;
          behaviorsText: string;
          alternativeThoughtsText: string;
        };
  }) => void
) => {
  return {
    saveCbtJournal: (entry: CbtJournalEntryType) => {
      dispatch(saveCbtJournal(entry));
    },
    updateCbtJournal: (
      id: string,
      situationText: string,
      thoughtsText: string,
      emotionsText: string,
      behaviorsText: string,
      alternativeThoughtsText: string
    ) => {
      dispatch(
        updateCbtJournal(
          id,
          situationText,
          thoughtsText,
          emotionsText,
          behaviorsText,
          alternativeThoughtsText
        )
      );
    },
    setDayInfo: (dayInfo: DayType) => {
      dispatch(setDayInfo(dayInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CBTAddScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    width: '100%',
    margin: 0,
    aspectRatio: 5 / 6,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 7 / 2,
  },
});
