import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from '../components/Themed';
import Colors from '../constants/Colors';
import { Card } from './Themed';

export function EndOfDayNotesModal({ text, isModalOpen, closeModal }) {
  return (
    <Modal
      isVisible={isModalOpen}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      avoidKeyboard
      style={styles.modal}
    >
      <Card style={styles.card}>
        <Text
          style={[styles.journalHeaderLabel, { color: Colors.dark.mutedText }]}
        >
          End of Day Notes Screen
        </Text>
        {text ? (
          <Text style={styles.text}>{text}</Text>
        ) : (
          <Text style={styles.text}>
            No End of Day notes entered for this day
          </Text>
        )}
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    height: '80%',
  },
  modal: {
    height: '20%',
  },
  journalHeaderLabel: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  text: {
    fontSize: 15,
    marginTop: 10,
  },
});
