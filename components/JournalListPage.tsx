import { AntDesign } from '@expo/vector-icons';
// import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../constants';
import getDateString from '../utils';
import JournalModal from './JournalModal';
import { Card, Text, View } from './Themed';

/**
 * Template for journal entry list pages: Journal (primary), CBT, and AWARE
 * @param navigation - Navigator object for app
 * @return {JSX.Element}
 */
export default function JournalListPage(props) {
  const colorScheme = useColorScheme() ?? 'dark';
  const [entryKeys, setEntryKeys] = useState([]);

  useEffect(() => {
    const keys = Object.keys(props.entries);
    if (props.entries && keys.length !== 0) {
      setEntryKeys(keys);
    }
  }, [props]);

  /**
   * Journal entry list item
   * @return {JSX.Element} - Return the list element
   */
  const JournalItem = ({ date, text }) => (
    <Card>
      <Text>{getDateString(date).date}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail">
        {text}
      </Text>
    </Card>
  );

  /**
   * Renders a journal entry list item. Clicking opens a modal containing the editable journal text
   * @param {string} item - The key used to access a particular journal entry
   * @return {JSX.Element} - Return the list element
   */
  const renderItem = ({ item }): JSX.Element => (
    props.entries[item] && 
    <TouchableOpacity
      onPress={() => {
        props.clickPastEntry(props.entries[item]);
      }}
      onLongPress={() => {
        Alert.alert(
          props.journalType ? `Delete ${props.journalType} Journal` : 'Delete Journal',
          'Are you sure you want to delete this journal entry?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => props.deleteJournal(item),
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
      }}
    >
      <JournalItem
        date={getDateString(props.entries[item].date).date}
        text={props.entries[item].text}
      />
    </TouchableOpacity>
  );

  /**
   * FIXME: Is there an easier way to do this via another prop or style on the flatlist itself?
   * Renders the space between journal entry cards
   * @return {JSX.Element} - Return a space
   */
  const renderSpace = (): JSX.Element => (
    <View style={styles.journalEntrySpace} />
  );

  return (
    <>
      <View style={styles.listContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title]}>Past Entries</Text>
          <TouchableOpacity style={styles.plusIcon} onPress={props.clickPlus}>
            <AntDesign name="plus" size={24} color={Colors.themeColor} />
          </TouchableOpacity>
        </View>

        {!props.loading &&  Object.entries(props.entries).length !== 0 && entryKeys.length !== 0 ? (
          <FlatList
            style={styles.list}
            data={entryKeys}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={renderSpace}
          />
        ) : (
          <Text>No journal entries yet!</Text>
        )}
      </View>

      <JournalModal
        label={getDateString(props.date).date}
        onBackdropPress={props.closeModal}
        onSwipeComplete={props.closeModal}
        modalVisible={props.modalVisible}
        text={props.text}
        setText={props.setText}
      />
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
