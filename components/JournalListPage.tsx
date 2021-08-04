import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import * as React from 'react';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import JournalModal from './JournalModal';
import { Card, Text, View } from './Themed';
import { Collections, Colors } from '../constants';
import getDateString from '../utils/index';

const db = firebase.firestore();

/**
 * Template for journal entry list pages: Journal (primary), CBT, and AWARE
 * @param navigation - Navigator object for app
 * @return {JSX.Element}
 */
export default function JournalListPage(props) {
  const colorScheme = useColorScheme() ?? 'dark';

  /**
   * Journal entry list item
   * @return {JSX.Element} - Return the list element
   */
  const JournalItem = ({ date, text }) => (
    <Card>
      <Text>{date}</Text>
      {/* FIXME: why does ellipses effect not work for multiline strings? */}
      <Text numberOfLines={1} ellipsizeMode="tail">
        {text}
      </Text>
    </Card>
  );

  /**
   * Renders a journal entry list item. Clicking opens a modal containing the editable journal text
   * @param {object} item - A journal object containing the text and date of the entry
   * @return {JSX.Element} - Return the list element
   */
  const renderItem = ({ item }): JSX.Element => (
    <TouchableOpacity onPress={() => props.clickPastEntry(item)}>
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

  return (
    <>
      <View style={styles.listContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title]}>Past Entries</Text>
          <TouchableOpacity style={styles.plusIcon} onPress={props.clickPlus}>
            <AntDesign name="plus" size={24} color={Colors.themeColor} />
          </TouchableOpacity>
        </View>

      { !props.loading &&
        <FlatList
          data={props.entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSpace}
        />
      }
      </View>

      <JournalModal
        label={props.date}
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
    borderColor: 'red',
    borderWidth: 1,
  },
});
