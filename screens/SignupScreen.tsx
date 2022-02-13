import '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PassMeter from 'react-native-passmeter';
import ThemeButton from '../components/ThemeButton';
import { Input } from '../components/Themed';
import firebase from '../firebase.js';

const MIN_PASSWORD_LEN = 6,
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
  const [confirmPassword, setConfirmPassword] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };
  async function handleSignUp() {
    if (email.includes('@')) {
      // Check to see if the user's email belongs to a supported school
      // Get the last occurrence of the '@' symbol (in case user enters multiple)
      const atSymbolCount = email.split('@').length - 1;
      const domain = email.split('@')[atSymbolCount];
      const fbResult = await firebase
        .firestore()
        .collection('accepted-email-domains')
        .get();
      const validDomains: string[] =
        fbResult.docs[0].data()['accepted-domains'];
      if (!validDomains.includes(domain)) {
        Alert.alert(
          'Alert',
          'Your email must be registered with one of our partnered schools to sign up.' +
            ' See list of available schools below',
          [
            {
              text: 'OK',
              onPress: () => console.log('Ok Pressed'),
            },
          ],
          { cancelable: false }
        );
        return;
      }
    } else {
      Alert.alert(
        'Alert',
        'Email format is incorrect.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Alert',
        'Password must be at least 6 characters long.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        'Oops!',
        'Passwords do not match',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.toLowerCase(), password)
      .then((response) => {
        response.user.sendEmailVerification();
        Alert.alert(
          'Check your email',
          'To finish the signup process, please follow the instructions in the email. Thank you!',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        navigation.navigate('Login');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text>TheBestMe</Text>
      <>
        <Input
          label="Email"
          placeholder="thebestme@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <Input
          keyboardType="visible-password"
          secureTextEntry
          placeholder="New Password..."
          value={password}
          onChangeText={setPassword}
        />
        <Input
          keyboardType="visible-password"
          secureTextEntry
          placeholder="Confirm New Password..."
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View>
          {password.length > 0 ? (
            <PassMeter
              showLabels
              password={password}
              minLength={MIN_PASSWORD_LEN}
              labels={PASSWORD_LABELS}
            />
          ) : null}
        </View>
      </>
      <View style={styles.buttonContainer}>
        <ThemeButton title="Sign up" onPress={handleSignUp} />
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
    aspectRatio: 11 / 3,
  },
});
