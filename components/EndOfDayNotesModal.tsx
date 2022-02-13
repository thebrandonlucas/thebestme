import React from 'react';
import Modal from 'react-native-modal';

export function EndOfDayNotesModal({ date, modalVisible, closeModal }) {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      avoidKeyboard
      style={styles.modal}
    ></Modal>
  );
}
