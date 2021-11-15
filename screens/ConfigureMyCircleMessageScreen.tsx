import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInputModal from '../components/TextInputModal';
import ThemeButton from '../components/ThemeButton';
import { View } from '../components/Themed';
import { setPanicMessage } from '../redux/actions/MyCircleActions';
import { RootState } from '../redux/store';

export default function ConfigureMyCircleMessageScreen({ navigation }) {
  const currentPanicMessage = useSelector<RootState, string>(
    (state) => state.myCircleReducer.panicMessage
  );
  const [message, setMessage] = useState(currentPanicMessage);

  const dispatch = useDispatch();

  async function savePanicMessage() {
    dispatch(setPanicMessage(message));
    await Alert.alert(
      'Message Saved',
      'The MyCircle default message has been saved!'
    );
    await navigation.navigate('Home');
  }

  console.log('cur', currentPanicMessage);
  return (
    <View style={styles.container}>
      <View>
        <TextInputModal
          text={message}
          setText={setMessage}
          label="Configure Message"
        />
        <View style={styles.buttonContainer}>
          <ThemeButton title="Save" onPress={savePanicMessage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    // alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 10,
    // alignSelf: 'none'
  },
});
