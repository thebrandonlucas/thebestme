import * as React from 'react';
import { StyleSheet } from 'react-native';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import { themeColor } from '../constants/Colors';
import { getDateString } from '../utils/index';

export default function CBTScreen() {
  const { date } = getDateString();

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.date, { color: themeColor }]}>{date}</Text>
        <View style={styles.inputContainer}>
          <Card style={{ margin: 0 }}>
            <TextInputModal label="Acknowledge and Accept" />
            <TextInputModal label="Wait and Watch" />
            <TextInputModal label="Actions" />
            <TextInputModal label="Repeat" />
            <TextInputModal label="End" />
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <ThemeButton title="Save Entry" />
          <ThemeButton title="Past Entries" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    width: '100%',
    margin: 0,
    aspectRatio: 5 / 6,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 7 / 2,
  },
});
