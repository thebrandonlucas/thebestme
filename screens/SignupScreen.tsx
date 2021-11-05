// import '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import PassMeter from 'react-native-passmeter';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/AuthActions';
import ThemeButton from '../components/ThemeButton';
import firebase from '../firebase.js';

const MIN_PASSWORD_LEN = 6,
  MAX_PASSWORD_LEN = 15,
  PASSWORD_LABELS = ['Too Short', 'Weak', 'Fair', 'Strong', 'Secure'];

/*
 * Code is loosely based on the following tutorials:
 * https://reactnativemaster.com/react-native-login-screen-tutorial
 * https://heartbeat.fritz.ai/how-to-build-an-email-authentication-app-with-firebase-firestore-and-react-native-a18a8ba78574#cbbf
 */
export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  async function setUser(email: String) {
    // await firebase.firestore().collection('users').add({
    //   username: email,
    // });
  }
  function handleSignUp() {
    if (password.length < 6) {
      Alert.alert(
        'Alert',
        'Password must be at least 6 characters long.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.toLowerCase(), password)
      .then((response) => {
        setUser(email);
        dispatch(signup(response.user));
        response.user.sendEmailVerification();
        Alert.alert(
          'Check your email',
          'To finish the signup process, please follow the instructions in the email. Thank you!',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          error.message,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      });
  }

  return (
    <View style={styles.container}>
      <Text>The Best Me</Text>
      <>
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Email..."
          placeholderTextColor="white"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          keyboardType="visible-password"
          secureTextEntry
          maxLength={MAX_PASSWORD_LEN}
          placeholder="New Password..."
          placeholderTextColor="white"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          keyboardType="visible-password"
          secureTextEntry
          maxLength={MAX_PASSWORD_LEN}
          placeholder="Confirm New Password..."
          placeholderTextColor="white"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View>
          {password.length > 0 ? (
            <PassMeter
              showLabels
              password={password}
              maxLength={MAX_PASSWORD_LEN}
              minLength={MIN_PASSWORD_LEN}
              labels={PASSWORD_LABELS}
            />
          ) : null}
        </View>
      </>

      <ThemeButton title="Sign up" onPress={handleSignUp} />
      <ThemeButton title="Go Back" onPress={goToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
