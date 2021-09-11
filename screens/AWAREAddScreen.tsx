import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import { Collections, Colors } from '../constants';
import getDateString from '../utils';

const db = firebase.firestore();

export default function AWAREAddScreen({ route, navigation }) {
  const awareJournalCollection = db.collection(Collections.awareJournal);

  // FIXME: is there a better way to do this? They don't need to be state vars
  const [id, setId] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [acknowledgeAndAcceptText, setAcknowledgeAndAcceptText] =
    useState<string>('');
  const [waitAndWatchText, setWaitAndWatchText] = useState<string>('');
  const [actionsText, setActionsText] = useState<string>('');
  const [repeatText, setRepeatText] = useState<string>('');
  const [endText, setEndText] = useState<string>('');

  useEffect(() => {
    if (route.params !== undefined) {
      setId(route.params.id);
      setDate(route.params.date);
      setAcknowledgeAndAcceptText(route.params.acknowledgeAndAcceptText);
      setWaitAndWatchText(route.params.waitAndWatchText);
      setActionsText(route.params.actionsText);
      setRepeatText(route.params.repeatText);
      setEndText(route.params.endText);
    }
  }, []);

  /**
   * Save a journal entry
   * @param {string} id
   * @param {string} text
   * @return {void}
   */
  function update(
    id: string,
    acknowledgeAndAcceptText: string,
    waitAndWatchText: string,
    actionsText: string,
    repeatText: string,
    endText: string
  ): void {
    awareJournalCollection.doc(id).update({
      acknowledgeAndAcceptText,
      waitAndWatchText,
      actionsText,
      repeatText,
      endText,
    });
  }

  /**
   * Add a new journal entry
   * @param {string} text
   * @param {string} date
   * @return {void}
   */
  function insert(
    acknowledgeAndAcceptText: string,
    waitAndWatchText: string,
    actionsText: string,
    repeatText: string,
    endText: string,
    date: string
  ): void {
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
    const entry = {
      acknowledgeAndAcceptText,
      waitAndWatchText,
      actionsText,
      repeatText,
      endText,
      date,
    };
    console.log('journal', entry);
    awareJournalCollection.add(entry);

    setAcknowledgeAndAcceptText('');
    setWaitAndWatchText('');
    setRepeatText('');
    setActionsText('');
    setEndText('');
  }

  /**
   * Insert or update (upsert) the entry
   * Close the journal modal
   * @return {void}
   */
  function upsertAndCloseModal() {
    console.log('upsert', acknowledgeAndAcceptText);
    if (id === '') {
      const date = getDateString().date;
      insert(
        acknowledgeAndAcceptText,
        waitAndWatchText,
        actionsText,
        repeatText,
        endText,
        date
      );
    } else {
      update(
        id,
        acknowledgeAndAcceptText,
        waitAndWatchText,
        actionsText,
        repeatText,
        endText
      );
    }
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
