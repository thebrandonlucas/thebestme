import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Themed';

export default function JournalTutorial() {
  return (
    <>
      <Text>
        This is your classic journal. Completely private. Completely yours.
        Journaling regularly decreases symptoms of depression, reduces stress
        and anxiety, and improves your mood among other things.
      </Text>
      <Text>{'\n\n'}</Text>
      <Text>There are two types of journals</Text>
    </>
  );
}

const styles = StyleSheet.create({});
