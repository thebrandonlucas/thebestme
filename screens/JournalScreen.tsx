import firebase from 'firebase';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import JournalListPage from '../components/JournalListPage';
import { Card, Text, View } from '../components/Themed';
import { Collections } from '../constants';
import { useJournals } from '../hooks/useJournals';
import getDateString from '../utils/index';

const db = firebase.firestore();

export default function JournalScreen({ navigation }) {
  const colorScheme = useColorScheme() ?? 'dark';
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const { journals, loading, error } = useJournals();

  /**
   * Save a journal entry
   * @return {void}
   */
  function save(journalId: string, journalText: string): void {
    db.collection(Collections.journal).doc(journalId).update({ journalText });
  }

  /**
   * Add a new journal entry
   * @return {void}
   */
  function add(): void {
    if (text.length === 0) {
      return;
    }
    const entry = {
      text,
      date,
    };

    db.collection(Collections.journal).add(entry);
    setText('');
  }

  /**
   * Click handler for "plus" button to add new journal entry.
   * Clears text, sets current date, and opens journal modal
   * @return {void}
   */
  function clickPlus(): void {
    setText('');
    setDate(getDateString().date);
    setModalVisible(true);
  }

  /**
   * Click handler for editing journal entry.
   * Sets text, current date, and opens journal modal
   * @return {void}
   */
  function clickPastEntry({ text, date }): void {
    setText(text);
    setDate(date);
    setModalVisible(true);
  }

  /** Close the journal modal
   * @return {void}
   */
  function closeModal(): void {
    add();
    setModalVisible(false);
  }

  return (
    <JournalListPage
      navigation={navigation}
      save={save}
      add={add}
      clickPlus={clickPlus}
      clickPastEntry={clickPastEntry}
      closeModal={closeModal}
      entries={journals}
      modalVisible={modalVisible}
      date={date}
      text={text}
      setText={setText}
      setDate={setDate}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  headerText: {
    fontSize: 15,
    margin: 10,
  },
  journalEntrySpace: {
    margin: 5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 9 / 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  plusIcon: {
    fontSize: 15,
    fontWeight: 'bold',
    // TODO: find better, more dynamic way to pad (using aspectRatio perhaps?)
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  list: {
    width: '100%',
  },
});
