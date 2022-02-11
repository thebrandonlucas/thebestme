import React from 'react';
import { StyleSheet } from 'react-native';
import Check from '../Icons/Check';
import Close from '../Icons/Close';
import Edit from '../Icons/Edit';
import Plus from '../Icons/Plus';
import RedClose from '../Icons/RedClose';
import { Text } from '../Themed';

export default function HabitTutorial() {
  return (
    <>
      <Text>
        Write down some habits you'd like to start or continue, and track
        whether you've completed them here. knowing what habits are putting you
        down and which ones are lifting you up can be crucial to your mental
        health.
      </Text>
      <Text></Text>
      <Text>{'\n\n'}</Text>
      <Text>Here's how to use this page:</Text>
      <Text>{'\n\n'}</Text>
      <Text>
        <Plus /> Opens the keyboard
      </Text>
      <Text>{'\n\n'}</Text>
      <Text>
        <Check /> Adds the habit
      </Text>
      <Text>{'\n\n'}</Text>
      <Text>
        <Edit /> Allows you to edit or delete it
      </Text>
      <Text>{'\n\n'}</Text>
      <Text>
        <RedClose /> Deletes it{' '}
      </Text>
      <Text>{'\n\n'}</Text>
      <Text>
        <Close /> Cancels{' '}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  bulletHabit: {
    marginVertical: 5,
  },
});
