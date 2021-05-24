import * as React from 'react';
import { StyleSheet } from 'react-native';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { Card, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import getDateString from '../utils';

export default function CBTScreen() {
  const { date } = getDateString();

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.date, { color: Colors.themeColor }]}>{date}</Text>
        <View style={styles.inputContainer}>
          <Card style={{ margin: 0 }}>
            <TextInputModal label="Situation" />
            <TextInputModal label="Thoughts" />
            <TextInputModal label="Emotions" />
            <TextInputModal label="Behaviors" />
            <TextInputModal label="Alternative Thoughts" />
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <ThemeButton
            title="Save Entry"
            onPress={() => console.log('Implement')}
          />
          <ThemeButton
            title="Past Entries"
            onPress={() => console.log('Implement')}
          />
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
