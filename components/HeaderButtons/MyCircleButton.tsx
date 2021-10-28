import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import * as SMS from 'expo-sms';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setIsSendingPanicMessage } from '../../redux/actions/MyCircleActions';

export function MyCircleButton({ myCircleReducer }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function sendSMS() {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const phoneNumbers = myCircleReducer.myCircle.map(friend => friend.phoneNumber);
      const { result } = await SMS.sendSMSAsync(
        phoneNumbers,
        'Hello! This is a sample test message from TheBestMe (Test by Brandon Lucas)');
    } else {
      // TODO: Implement Error checking
    }
  }

  function clickChooseFriends() {
    setIsSendingPanicMessage(true);
    // console.log('hello')
    navigation.navigate('ConfigureMyCircle', { isSendingPanicMessage: true });
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

const mapStateToProps = (state) => {
  const { myCircleReducer } = state;
  return { myCircleReducer };
};

export default connect(
  mapStateToProps,
)(memo(MyCircleButton));
