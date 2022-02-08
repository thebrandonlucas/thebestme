import { DateTime } from 'luxon';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import JournalListPage from '../components/JournalListPage';
import { setDayInfo } from '../redux/actions/DayActions';
import {
  deleteJournal,
  saveJournal,
  updateJournal,
} from '../redux/actions/JournalActions';
import { DayType, JournalEntryType } from '../types';
import getDateString from '../utils/index';

export function PrimaryJournalScreen({
  navigation,
  journalReducer,
  setDayInfo,
  saveJournal,
  updateJournal,
  deleteJournal,
  today,
}) {
  const colorScheme = useColorScheme() ?? 'dark';
  const [journalId, setJournalId] = useState<string>('');
  const [journalText, setJournalText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAddingJournal, setIsAddingJournal] = useState<boolean>(false);
  const [isEditingJournal, setIsEditingJournal] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [journals, setJournals] = useState<JournalEntryType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(journalReducer.journals).length !== 0) {
      setJournals(journalReducer.journals);
      setLoading(false);
    }
  }, [journalReducer]);

  /**
   * Save a journal entry
   * @return {void}
   */
  function save(): void {
    // Why is journalText undefined here when blank?
    if (!journalText || journalText.length === 0) {
      return;
    }

    if (isAddingJournal) {
      const id = uuidv4();
      const journal = {
        [id]: {
          id,
          text: journalText,
          date: DateTime.now().toISODate(),
        },
      };

      saveJournal(journal);
      setJournalText('');
      setIsAddingJournal(false);

      const tempJournalIds = [...today.journalIds, id];
      setDayInfo({ ...today, journalIds: tempJournalIds });
    } else {
      updateJournal(journalId, journalText);
      setJournalId('');
      setJournalText('');
      setIsEditingJournal(false);
    }
  }

  /**
   * Click handler for "plus" button to add new journal entry.
   * Clears text, sets current date, and opens journal modal
   * @return {void}
   */
  function clickPlus(): void {
    setJournalId('');
    // FIXME: Refactor getDateString and all function calls to it
    setDate(getDateString(new Date().toISOString()).date);
    setIsAddingJournal(true);
    setModalVisible(true);
  }

  /**
   * Click handler for editing journal entry.
   * Sets text, current date, and opens journal modal
   * @return {void}
   */
  function clickPastEntry({ id, text, date }): void {
    setJournalId(id);
    setJournalText(text);
    setDate(date);
    setIsEditingJournal(true);
    setModalVisible(true);
  }

  /**
   * Close the journal modal
   * @param {string} journalId - Optional param, if present, update the text at that id, else, insert new text
   * @return {void}
   */
  // FIXME: is this method necessary?
  function upsertAndCloseModal(): void {
    save();
    setModalVisible(false);
  }

  return (
    <>
      <JournalListPage
        navigation={navigation}
        update={save}
        save={save}
        clickPlus={clickPlus}
        clickPastEntry={clickPastEntry}
        closeModal={upsertAndCloseModal}
        entries={journals}
        modalVisible={modalVisible}
        date={date}
        text={journalText}
        setText={setJournalText}
        setDate={setDate}
        deleteJournal={deleteJournal}
        journalType={'primary'}
        loading={loading}
      />
    </>
  );
}

// TODO: refactor to useDispatch for simplicity
const mapStateToProps = (state) => {
  const { journalReducer } = state;
  const { today } = state.dayReducer;
  return { journalReducer, today };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveJournal: (journal) => {
      dispatch(saveJournal(journal));
    },
    deleteJournal: (id) => {
      dispatch(deleteJournal(id));
    },
    updateJournal: (id, text) => {
      dispatch(updateJournal(id, text));
    },
    setDayInfo: (dayInfo: DayType) => {
      dispatch(setDayInfo(dayInfo));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryJournalScreen);

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
