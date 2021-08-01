import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../constants';
import { Card, Input, Text, useThemeColor } from './Themed';
import JournalModal from './JournalModal';

interface TextInputModalProps {
  label: string;
  lightColor?: string;
  darkColor?: string;
}

TextInputModal.defaultProps = {
  lightColor: Colors.light.mutedText,
  darkColor: Colors.dark.mutedText,
};

/**
 * Renders a TextInput that opens a screen-covering modal for entering text
 * @param {TextInputModalProps} props - Title/label of the modal, as well as color strings for light mode and dark mode
 * @return {JSX.Element}
 */
export default function TextInputModal(props: TextInputModalProps) {
  const { label, lightColor, darkColor } = props;
  const mutedTextColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'mutedText'
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'separator'
  );

  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [height, setHeight] = useState(0);

  /**
   * Opens the TextInput modal
   * @return {void}
   */
  function openModal() {
    setModalVisible(true);
  }

  /**
   * Closes the TextInput modal
   * @return {void}
   */
  function closeModal() {
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <Input
          label={label}
          placeholder="Press to Enter"
          pointerEvents="none"
          value={text}
        />
      </TouchableOpacity>
      <JournalModal
        label={label}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        modalVisible={modalVisible}
        text={text}
        setText={setText}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  journalHeaderLabel: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
    // borderColor: 'red',
    // borderWidth: 1,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 7 / 2,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  journalScroll: {
    aspectRatio: 11 / 16,
    // borderColor: 'red',
    // borderWidth: 1
  },
  modalView: {
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
  },
});
