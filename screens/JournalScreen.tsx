import firebase from 'firebase';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { setDayInfo } from '../actions';
import JournalListPage from '../components/JournalListPage';
import { Collections } from '../constants';
import { useJournals } from '../hooks/useJournals';
import getDateString from '../utils/index';
import CBTAddScreen from './CBTAddScreen';

const db = firebase.firestore();

export function JournalScreen({ navigation, day }) {
  const dispatch = useDispatch();

  const journalCollection = db.collection(Collections.journal);
  const colorScheme = useColorScheme() ?? 'dark';
  const [journalId, setJournalId] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const { journals, loading, error } = useJournals();

  /**
   * Save a journal entry
   * @return {void}
   */
  function update(id: string, text: string): void {
    journalCollection.doc(id).update({ text: text });
  }

  /**
   * Add a new journal entry
   * @return {void}
   */
  function insert(text: string, date: string): void {
    if (text.length === 0) {
      return;
    }
    const entry = {
      text,
      date,
    };

    journalCollection.add(entry);

    // Set new awareIds entry as date timestamp and update redux day object
    const journalIds = [...day.journalIds, date];
    dispatch(setDayInfo({ ...day, journalIds }));

    setText('');
  }

  /**
   * Click handler for "plus" button to add new journal entry.
   * Clears text, sets current date, and opens journal modal
   * @return {void}
   */
  function clickPlus(): void {
    setText('');
    setJournalId('');
    // FIXME: Refactor getDateString and all function calls to it
    setDate(getDateString(new Date().toISOString()).date);
    setModalVisible(true);
  }

  /**
   * Click handler for editing journal entry.
   * Sets text, current date, and opens journal modal
   * @return {void}
   */
  function clickPastEntry({ id, text, date }): void {
    setJournalId(id);
    setText(text);
    setDate(date);
    setModalVisible(true);
  }

  /** 
   * Close the journal modal
   * @param {string} journalId - Optional param, if present, update the text at that id, else, insert new text
   * @return {void}
   */
  function upsertAndCloseModal(): void {
    if (journalId === '') {
      const isoDate = new Date().toISOString();
      insert(text, isoDate);
    } else {
      update(journalId, text);
    }
    setModalVisible(false);
  }

  return (
    <JournalListPage
      navigation={navigation}
      update={update}
      insert={insert}
      clickPlus={clickPlus}
      clickPastEntry={clickPastEntry}
      closeModal={upsertAndCloseModal}
      entries={journals}
      modalVisible={modalVisible}
      date={date}
      text={text}
      setText={setText}
      setDate={setDate}
    />
  );
}

const mapStateToProps = (state) => {
  const { day } = state;
  return { day };
};
export default connect(mapStateToProps)(JournalScreen);

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

