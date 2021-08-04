import firebase from 'firebase';
import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, useColorScheme } from 'react-native';
import JournalListPage from '../components/JournalListPage';
import { Collections } from '../constants';

const db = firebase.firestore();

export default function AWAREScreen({ navigation }) {
  const colorScheme = useColorScheme() ?? 'dark';
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const loading = false;

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

    Alert.alert(
      date,
      'Entry Successfully Saved',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }

  /**
   * Click handler for "plus" button to add new journal entry.
   * Clears text, sets current date, and opens journal modal
   * @return {void}
   */
  function clickPlus(): void {
    navigation.navigate('AWAREAddScreen');
  }

  /**
   * Click handler for editing AWARE entry by going to AWARE page.
   * Passes id, text, and date to route
   * @return {void}
   */
  function clickPastEntry({ id, text, date }): void {
    navigation.navigate('AWAREAddScreen', { id, text, date });
  }

  /** Close the journal modal
   * @return {void}
   */
  function closeModal(): void {
    setModalVisible(false);
  }

  const DATA = [
    {
      id: 1,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 2,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 3,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 4,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 5,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 6,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 7,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 8,
      date: 'Monday, July 19, 2021',
      text: 'Test 2',
    },
    {
      id: 9,
      date: 'Monday, July 19, 2021',
      text: 'There once was a genie with a fifty foot There once was a genie with a fifty foot There once was a genie with a fifty foot ',
    },
  ];

  return (
    <JournalListPage
      navigation={navigation}
      save={save}
      add={add}
      clickPlus={clickPlus}
      clickPastEntry={clickPastEntry}
      closeModal={closeModal}
      entries={DATA}
      loading={loading}
      modalVisible={modalVisible}
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
});
