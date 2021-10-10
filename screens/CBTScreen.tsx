import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, useColorScheme } from 'react-native';
import { connect } from 'react-redux';
import JournalListPage from '../components/JournalListPage';
import { Collections } from '../constants';
import getDateString from '../utils/index';


export function CBTScreen({ navigation, cbtReducer }) {
  const colorScheme = useColorScheme() ?? 'dark';
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [cbtJournals, setCbtJournals] = useState({});

  useEffect(() => {
    if (Object.keys(cbtReducer.cbtJournals).length !== 0) {
      setCbtJournals(cbtReducer.cbtJournals);
    }
  }, [cbtReducer]);

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
      entries={cbtJournals}
      date={date}
      setDate={setDate}
      modalVisible={modalVisible}
    />
  );
}


const mapStateToProps = (state) => {
  const { cbtReducer } = state;
  return { cbtReducer };
};
export default connect(mapStateToProps)(CBTScreen);