import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import * as SMS from 'expo-sms';

export default function MyCircleButton() {

  async function sendSMS() {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ['2176910103'],
        'Hello! This is a sample test message from TheBestMe (Test by Brandon Lucas)');
    } else {
      // TODO: Implement Error checking
    }
  }
  
  function myCircleAlert() {
    Alert.alert(
      'MyCircle',
      'Send Help alert to all your friends?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Choose Friends',
          onPress: () => console.log('Choose Friends Pressed'),
          style: 'cancel',
        },
        {
          text: 'Send to All',
          onPress: () => sendSMS(),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <TouchableOpacity onPress={myCircleAlert}>
      <Ionicons
        name="alert-circle"
        size={30}
        style={{ marginLeft: 30 }}
        color={Colors.themeColor}
      />
    </TouchableOpacity>
  );
}
