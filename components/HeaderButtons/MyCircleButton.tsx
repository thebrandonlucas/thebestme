import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SMS from 'expo-sms';
import React, { memo } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { setIsSendingPanicMessage } from '../../redux/actions/MyCircleActions';
import { RootState } from '../../redux/store';
import { MyCircleFriendType, MyCircleReducerType } from '../../types';

export default function MyCircleButton() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCircle = useSelector<RootState, MyCircleFriendType[]>(
    (state) => state.myCircleReducer.myCircle
  );
  const panicMessage = useSelector<RootState, string>(
    (state) => state.myCircleReducer.panicMessage
  );

  async function sendSMS() {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const phoneNumbers = myCircle.map((friend) => friend.phoneNumber);
      await SMS.sendSMSAsync(phoneNumbers, panicMessage).catch((err) => {
        Alert.alert('Error', JSON.stringify(err));
      });
    } else {
      Alert.alert(
        'Error',
        'Sorry, but this device is not capable of retrieving contacts'
      );
    }
  }

  function clickChooseFriends() {
    setIsSendingPanicMessage(true);
    navigation.navigate('ConfigureMyCircleFriends', {
      isSendingPanicMessage: true,
    });
  }

  function myCircleAlert() {
    Alert.alert(
      'MyCircle',
      'Send help alert to all your friends?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Choose Friends',
          onPress: () => clickChooseFriends(),
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

// export default MyCircleButton;
