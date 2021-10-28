import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import {
  saveAwareJournal,
  updateAwareJournal,
} from '../redux/actions/AwareActions';
import { setDayInfo } from '../redux/actions/DayActions';
import { AwareJournalEntryType, DayType } from '../types';
import getDateString from '../utils';
import { DateTime } from 'luxon';

export function AWAREAddScreen({ route, navigation, day, today, setDayInfo, saveAwareJournal, updateAwareJournal }) {
  // FIXME: is there a better way to do this? They don't need to be state vars
  const [awareId, setAwareId] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [acknowledgeAndAcceptText, setAcknowledgeAndAcceptText] =
    useState<string>('');
  const [waitAndWatchText, setWaitAndWatchText] = useState<string>('');
  const [actionsText, setActionsText] = useState<string>('');
  const [repeatText, setRepeatText] = useState<string>('');
  const [endText, setEndText] = useState<string>('');
  const [isAddingJournal, setIsAddingJournal] = useState<boolean>(false);

  useEffect(() => {
    if (route.params !== undefined) {
      setAwareId(route.params.id);
      setDate(getDateString(route.params.date).date);
      setAcknowledgeAndAcceptText(route.params.acknowledgeAndAcceptText);
      setWaitAndWatchText(route.params.waitAndWatchText);
      setActionsText(route.params.actionsText);
      setRepeatText(route.params.repeatText);
      setEndText(route.params.endText);
    } else {
      setIsAddingJournal(true);
    }
  }, [route]);

  /**
   * Add a new journal entry
   * @param {string} text
   * @param {string} date - ISO datetime string used as ID of journal entry
   * @return {void}
   */
  function save(): void {
    // Don't add to firebase if all fields empty
    if (
      acknowledgeAndAcceptText.length === 0 &&
      waitAndWatchText.length === 0 &&
      actionsText.length === 0 &&
      repeatText.length === 0 &&
      endText.length === 0
    ) {
      return;
    }

    if (isAddingJournal) {
      const id = uuidv4();
      const entry = {
        [id]: {
          id,
          date: DateTime.now().toISODate(),
          acknowledgeAndAcceptText,
          waitAndWatchText,
          actionsText,
          repeatText,
          endText,
        },
      };
      saveAwareJournal(entry);
      const tempAwareIds = [...today.awareIds, id];
      setDayInfo({ ...today, awareIds: tempAwareIds });
    } else {
      updateAwareJournal(
        awareId,
        acknowledgeAndAcceptText,
        waitAndWatchText,
        actionsText,
        repeatText,
        endText
      );
      const tempAwareIds = [...today.awareIds, awareId];
      setDayInfo({ ...today, awareIds: tempAwareIds });
    }
    setAcknowledgeAndAcceptText('');
    setWaitAndWatchText('');
    setRepeatText('');
    setActionsText('');
    setEndText('');
    setAwareId('');
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
              text={acknowledgeAndAcceptText}
              setText={setAcknowledgeAndAcceptText}
              label="Acknowledge and Accept"
            />
            <TextInputModal
              text={waitAndWatchText}
              setText={setWaitAndWatchText}
              label="Wait and Watch"
            />
            <TextInputModal
              text={actionsText}
              setText={setActionsText}
              label="Actions"
            />
            <TextInputModal
              text={repeatText}
              setText={setRepeatText}
              label="Repeat"
            />
            <TextInputModal text={endText} setText={setEndText} label="End" />
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <ThemeButton
            title="Save Entry"
            testID="save"
            onPress={() => upsertAndCloseModal()}
          />
          <ThemeButton
            title="Past Entries"
            testID="pastEntries"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </>
  );
}

const mapStateToProps = (state) => {
  const { day, today } = state.dayReducer;
  return { day, today };
};
const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload:
      | DayType
      | AwareJournalEntryType
      | {
          id: string;
          acknowledgeAndAcceptText: string;
          waitAndWatchText: string;
          actionsText: string;
          repeatText: string;
          endText: string;
        };
  }) => void
) => {
  return {
    saveAwareJournal: (entry: AwareJournalEntryType) => {
      dispatch(saveAwareJournal(entry));
    },
    updateAwareJournal: (
      id: string,
      acknowledgeAndAcceptText: string,
      waitAndWatchText: string,
      actionsText: string,
      repeatText: string,
      endText: string
    ) => {
      dispatch(
        updateAwareJournal(
          id,
          acknowledgeAndAcceptText,
          waitAndWatchText,
          actionsText,
          repeatText,
          endText
        )
      );
    },
    setDayInfo: (dayInfo: DayType) => {
      dispatch(setDayInfo(dayInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AWAREAddScreen);

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
