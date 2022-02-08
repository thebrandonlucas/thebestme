import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import TopTabs from '../components/TopTabs';
import CBTScreen from './CBTScreen';
import PrimaryJournalScreen from './PrimaryJournalScreen';

export default function JournalScreen({ navigation }) {
  const [screen, setScreen] = useState({ title: 'Primary', link: 'primary' });

  return (
    <>
      <TopTabs
        screen={screen}
        setScreen={setScreen}
        tabs={[
          { title: 'Primary', link: 'primary' },
          { title: 'CBT', link: 'cbt' },
        ]}
      />

      {screen.link === 'primary' ? (
        <PrimaryJournalScreen navigation={navigation} />
      ) : (
        <CBTScreen navigation={navigation} />
      )}
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
