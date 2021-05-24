import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

export default function MyCircleButton() {
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
        onPress: () => console.log('OK Pressed'),
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );
}
