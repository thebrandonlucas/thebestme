// import '@firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import ThemeButton from '../components/ThemeButton';
import { Input, View } from '../components/Themed';
import firebase from '../firebase.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  /**
   * Reset a user's password by sending it to a new email
   * @param {string} email - The user's email to send the password reset request to
   */
  function sendPasswordResetEmail() {
    firebase.auth().sendPasswordResetEmail(email);
    Alert.alert(
      'Password Reset Email Sent',
      'Please check your email for a link to reset your password',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Input
        label="Email to send password reset"
        placeholder="thebestme@example.com"
        onChangeText={setEmail}
      />
      <View style={styles.buttonContainer}>
        <ThemeButton
          title="Send Password Reset Email"
          onPress={sendPasswordResetEmail}
          testID="passwordResetEmailButton"
        />
        <ThemeButton title="Go Back" onPress={goToLogin} />
      </View>
    </KeyboardAvoidingView>
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
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 14 / 4,
  },
});
