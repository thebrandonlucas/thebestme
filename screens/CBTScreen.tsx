import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, useColorScheme } from 'react-native';
import JournalListPage from '../components/JournalListPage';
import { Collections } from '../constants';
import { useCbt } from '../hooks/useCbt';
import getDateString from '../utils/index';

const db = firebase.firestore();

export default function CBTScreen({ navigation }) {
  const colorScheme = useColorScheme() ?? 'dark';
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const { journals, loading, error } = useCbt();

  useEffect(() => {
    console.log('adsf', journals);
  }, []);

  /**
   * Click handler for "plus" button to add new journal entry.
   * Clears text, sets current date, and opens journal modal
   * @return {void}
   */
  function clickPlus(): void {
    navigation.navigate('CBTAddScreen');
  }

  /**
   * Click handler for editing AWARE entry by going to AWARE page.
   * Passes id, text, and date to route
   * @return {void}
   */
  function clickPastEntry({
    id,
    date,
    situationText,
    thoughtsText,
    emotionsText,
    behaviorsText,
    alternativeThoughtsText
  }): void {
    navigation.navigate('CBTAddScreen', {
      id,
      date,
      situationText,
      thoughtsText,
      emotionsText,
      behaviorsText,
      alternativeThoughtsText
    });
  }

  /** Close the journal modal
   * @return {void}
   */
  function closeModal(): void {
    setModalVisible(false);
  }

  return (
    <JournalListPage
      navigation={navigation}
      clickPlus={clickPlus}
      clickPastEntry={clickPastEntry}
      closeModal={closeModal}
      entries={journals}
      loading={loading}
      date={date}
      setDate={setDate}
      modalVisible={modalVisible}
    />
  );
}
