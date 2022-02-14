import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TopTabs from '../components/TopTabs';
import TutorialModal from '../components/TutorialModals/TutorialModal';
import { setJournalDescription } from '../redux/actions/DescriptionActions';
import { RootState } from '../redux/store';
import CBTScreen from './CBTScreen';
import PrimaryJournalScreen from './PrimaryJournalScreen';

export default function JournalScreen({ navigation }) {
  const [screen, setScreen] = useState({ title: 'Journal', link: 'journal' });

  const dispatch = useDispatch();

  const journalDescription = useSelector<RootState, 'journal' | 'cbt'>(
    (state) => state.descriptionReducer.journalInfoType
  );

  function clickTab(tab: { title: string; link: 'journal' | 'cbt' }) {
    dispatch(setJournalDescription(tab.link));
    setScreen(tab);
  }

  return (
    <>
      <TopTabs
        screen={screen}
        clickTab={clickTab}
        tabs={[
          { title: 'Journal', link: 'journal' },
          { title: 'Thought Challenging', link: 'cbt' },
        ]}
      />

      {screen.link === 'journal' ? (
        <PrimaryJournalScreen navigation={navigation} />
      ) : (
        <CBTScreen navigation={navigation} />
      )}
      <TutorialModal />
    </>
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
