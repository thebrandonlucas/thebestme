import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import ThemeButton from '../components/ThemeButton';
import { Text, View, Input } from '../components/Themed';
import firebase from '../firebase.js'
import '@firebase/firestore'
import { useState } from 'react';
import { login } from '../actions';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
    firebase.auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then((response) => {
        if (response.user.emailVerified) {
          firebase.firestore()
          .collection('users')
          .where('username' , '==', response.user.email)
          .limit(1)
          .onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
              const queryDocumentSnapshot = querySnapshot.docs[0];
              const queryDocumentSnapshotData = queryDocumentSnapshot.data()
              dispatch(login(queryDocumentSnapshotData))
              navigation.navigate('BottomTabNavigator')
            }
          })
        } else {
          Alert.alert(
            "Email Unverified",
            "The email address " + response.user.email + " is unverified. Please verify to login.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
        
      })
      .catch(error => {
        Alert.alert(
          "Error",
          error.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      })
  }
  return (
    <View style={styles.container}>
        <Input label="Email" placeholder="thebestme@example.com" onChangeText={handleInputEmailChange}/>
        <Input label="Password" secureTextEntry keyboardType="visible-password" placeholder="Keep it secret! Keep it safe!" onChangeText={handlePasswordInputChange} />
        <ThemeButton
          title="Login"
          onPress={handleLogin}
          testID="login"
        />
        <ThemeButton
          title="Sign Up"
          onPress={goToSignUp}
          testID="signUp"
        />
      <Button onPress={() => submit()} title="Forgot Password?" />
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
