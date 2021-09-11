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

export default function CBTAddScreen({ route, navigation }) {
  const cbtJournalCollection = db.collection(Collections.cbtJournal);
  const [id, setId] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [situationText, setSituationText] = useState<string>('');
  const [thoughtsText, setThoughtsText] = useState<string>('');
  const [emotionsText, setEmotionsText] = useState<string>('');
  const [behaviorsText, setBehaviorsText] = useState<string>('');
  const [alternativeThoughtsText, setAlternativeThoughtsText] =
    useState<string>('');

  useEffect(() => {
    if (route.params !== undefined) {
      setId(route.params.id);
      setDate(route.params.date);
      setSituationText(route.params.situationText);
      setThoughtsText(route.params.thoughtsText);
      setEmotionsText(route.params.thoughtsText);
      setBehaviorsText(route.params.emotionsText);
      setAlternativeThoughtsText(route.params.alternativeThoughtsText);
    }
  }, []);

  /**
   * Save a journal entry
   * @param {string} id
   * @param {string} text
   * @return {void}
   */
  function update(id: string): void {
    cbtJournalCollection.doc(id).update({
      situationText,
      thoughtsText,
      emotionsText,
      behaviorsText,
      alternativeThoughtsText,
    });
  }

  /**
   * Add a new journal entry
   * @param {string} text
   * @param {string} date
   * @return {void}
   */
  function insert(date: string): void {
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
    const entry = {
      situationText,
      thoughtsText,
      emotionsText,
      behaviorsText,
      alternativeThoughtsText,
      date,
    };
    cbtJournalCollection.add(entry);

    setSituationText('');
    setThoughtsText('');
    setEmotionsText('');
    setBehaviorsText('');
    setAlternativeThoughtsText('');
  }

  /**
   * Insert or update (upsert) the entry
   * Close the journal modal
   * @return {void}
   */
  function upsertAndCloseModal() {
    if (id === '') {
      const date = getDateString().date;
      insert(date);
    } else {
      update(id);
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
