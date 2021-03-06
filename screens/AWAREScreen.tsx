import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { connect } from 'react-redux';
import JournalListPage from '../components/JournalListPage';
import { deleteAwareJournal } from '../redux/actions/AwareActions';
import { AwareJournalEntryType } from '../types';
import { getGuidedJournalDisplayText } from '../utils/getGuidedJournalDisplayText';

export function AWAREScreen({ navigation, awareReducer, deleteAwareJournal }) {
  const colorScheme = useColorScheme() ?? 'dark';
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [awareJournals, setAwareJournals] = useState<AwareJournalEntryType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(awareReducer.awareJournals).length !== 0) {
      setAwareJournals(awareReducer.awareJournals);
      setLoading(false);
    }
  }, [awareReducer]);

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
  function clickPastEntry({
    id,
    date,
    acknowledgeAndAcceptText,
    waitAndWatchText,
    actionsText,
    repeatText,
    endText,
  }): void {
    navigation.navigate('AWAREAddScreen', {
      id,
      date,
      acknowledgeAndAcceptText,
      waitAndWatchText,
      actionsText,
      repeatText,
      endText,
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
      entries={awareJournals}
      date={date}
      setDate={setDate}
      deleteJournal={deleteAwareJournal}
      journalType={'aware'}
      loading={loading}
    />
  );
}

const mapStateToProps = (state) => {
  const { awareReducer } = state;
  return { awareReducer };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAwareJournal: (id) => {
      dispatch(deleteAwareJournal(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AWAREScreen);

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
