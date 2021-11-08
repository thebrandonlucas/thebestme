// import '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Image } from 'react-native';
import ThemeButton from '../components/ThemeButton';
import { Input, View } from '../components/Themed';
import firebase from '../firebase.js';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  function goToSignUp() {
    navigation.navigate('Signup');
  }

  function handleInputEmailChange(text) {
    setEmail(text);
  }

  function handlePasswordInputChange(text) {
    setPassword(text);
  }

  function handleLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then((response) => {
        if (response.user.emailVerified) {
          navigation.navigate('Home');
        } else {
          Alert.alert(
            'Email Unverified',
            'The email address ' +
              response.user.email +
              ' is unverified. Please verify to login.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
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
      <Image
        style={styles.logo}
        source={require('../assets/images/thebestme-logo.jpg')}
      />
      <Input
        label="Email"
        placeholder="thebestme@example.com"
        onChangeText={handleInputEmailChange}
      />
      <Input
        label="Password"
        secureTextEntry
        keyboardType="visible-password"
        placeholder="Keep it secret! Keep it safe!"
        onChangeText={handlePasswordInputChange}
      />

      <View style={styles.buttonContainer}>
        <ThemeButton title="Login" onPress={handleLogin} testID="login" />
        <ThemeButton title="Sign Up" onPress={goToSignUp} testID="signUp" />
        <Button
          onPress={() => navigation.navigate('ForgotPassword')}
          title="Forgot Password?"
        />
      </View>
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
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    top: '5%',
    aspectRatio: 7 / 3,
  },
  logo: {
    width: '100%',
    height: 200,
  }
});
