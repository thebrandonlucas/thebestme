import firebase from 'firebase';
import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, useColorScheme, FlatList } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Separator, Text, View } from '../components/Themed';
import { Collections, Colors } from '../constants';
import getDateString from '../utils/index';
import { JournalEntryType } from '../types';
import { Card } from '../components/Themed';
import ThemeButton from '../components/ThemeButton';
import { AntDesign } from '@expo/vector-icons';
import JournalModal from '../components/JournalModal';

const db = firebase.firestore();

export default function JournalScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');

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
    setText('');
    setDate(getDateString().date);
    setModalVisible(true);
  }


  /**
   * Click handler for editing journal entry.
   * Sets text, current date, and opens journal modal
   * @return {void}
   */ 
  function clickPastEntry({text, date}): void {
    setText(text);
    setDate(date);
    setModalVisible(true);
  }

  /** Close the journal modal
   * @return {void}
   */
  function closeModal(): void {
    setModalVisible(false);
  }

  /**
   * Journal entry list item 
   * @return {JSX.Element} - Return the list element
   */ 
  const JournalItem = ({ date, text }) => (
    <Card>
      <Text>{date}</Text>
      {/* FIXME: why does ellipses effect not work for multiline strings? */}
      <Text numberOfLines={1} ellipsizeMode='tail'>{text}</Text>
    </Card>
  );

  /**
   * Renders a journal entry list item. Clicking opens a modal containing the editable journal text
   * @param {object} item - A journal object containing the text and date of the entry
   * @return {JSX.Element} - Return the list element
   */ 
  const renderItem = ({ item }): JSX.Element => (
    <TouchableOpacity onPress={() => clickPastEntry(item)}>
      <JournalItem date={item.date} text={item.text} />
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

  const DATA = [
    {
      id: 1,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 2,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 3,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 4,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 5,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 6,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 7,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 8,
      date: 'Monday, July 19, 2021',
      text: 'Test 2'
    },
    {
      id: 9,
      date: 'Monday, July 19, 2021',
      text: 'There once was a genie with a fifty foot There once was a genie with a fifty foot There once was a genie with a fifty foot '
    }
  ]

  return (
    <>
      <View style={styles.listContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title]}>Past Entries</Text>
          <TouchableOpacity style={styles.plusIcon} onPress={clickPlus}>
            <AntDesign name="plus" size={24} color={Colors.themeColor} />
          </TouchableOpacity>
        </View>
      
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={renderSpace}
        />
      </View>


      <JournalModal
        label={date}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        modalVisible={modalVisible}
        text={text}
        setText={setText}
      />
      
      {/* <View style={styles.headerContainer}>
        <Text>
          <TouchableWithoutFeedback>
            <Text style={[styles.headerText, { color: Colors.themeColor }]}>
              {date}
            </Text>
          </TouchableWithoutFeedback>
        </Text>
        <Text>
          <TouchableOpacity onPress={() => console.log('implement save')}>
            <Text style={[styles.headerText, { color: Colors.themeColor }]}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.headerText, { color: Colors.themeColor }]}>
              Past Entries
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <Separator style={styles.separator} />
      <KeyboardAwareScrollView
        style={[
          { borderBottomColor: Colors[colorScheme].separator },
          { borderTopColor: Colors[colorScheme].separator },
        ]}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
      >
        <Input
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="What's on your mind?"
          multiline
          onChangeText={setText}
          value={text}
          scrollEnabled={false}
        />
      </KeyboardAwareScrollView> */}
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
    margin: 5
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
