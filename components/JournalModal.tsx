import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../constants';
import { Card, Input, Text, useThemeColor } from './Themed';

interface JournalModalProps {
  modalVisible: boolean;
  text: string;
  label: string;
  lightColor?: string;
  darkColor?: string;
  setText: (text: string) => void;
  onBackdropPress: () => void;
  onSwipeComplete: () => void;
}

JournalModal.defaultProps = {
  lightColor: Colors.light.mutedText,
  darkColor: Colors.dark.mutedText,
};

/**
 * Renders a modal for entering text
 * @param {JournalModalProps} props - Title/label of the modal, as well as color strings for light mode and dark mode
 * @return {JSX.Element}
 */
export default function JournalModal(props: JournalModalProps) {
  const { label, lightColor, darkColor } = props;
  const mutedTextColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'mutedText'
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'separator'
  );

//   const [text, setText] = useState<string>('');
  const [height, setHeight] = useState(0);

  return (
    <>
      <Modal
        isVisible={props.modalVisible}
        onBackdropPress={props.onBackdropPress}
        onSwipeComplete={props.onSwipeComplete}
        swipeDirection="down"
        avoidKeyboard
      >
        <Card>
          <Text style={[styles.journalHeaderLabel, { color: mutedTextColor }]}>
            {label}
          </Text>
          <ScrollView
            style={[
              styles.journalScroll,
              { borderBottomColor: borderColor },
              { borderTopColor: borderColor },
            ]}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            onLayout={(event) => {
              setHeight(event.nativeEvent.layout.height);
            }}
          >
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ height: height - 20 }}
              placeholder="What's on your mind?"
              multiline
              onChangeText={props.setText}
              value={props.text}
            />
          </ScrollView>
        </Card>
      </Modal>
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
