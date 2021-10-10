// import '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/AuthActions';
import ThemeButton from '../components/ThemeButton';
import { Input, View } from '../components/Themed';
// 
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
    // firebase
      // .auth()
      // .signInWithEmailAndPassword(email.toLowerCase(), password)
      // .then((response) => {
      //   if (response.user.emailVerified) {
      //     firebase
      //       .firestore()
      //       .collection('users')
      //       .where('username', '==', response.user.email)
      //       .limit(1)
      //       .onSnapshot((querySnapshot) => {
      //         if (!querySnapshot.empty) {
      //           const queryDocumentSnapshot = querySnapshot.docs[0];
      //           const queryDocumentSnapshotData = queryDocumentSnapshot.data();
      //           dispatch(login(queryDocumentSnapshotData));
      //           navigation.navigate('BottomTabNavigator');
      //         }
      //       });
      //   } else {
      //     Alert.alert(
      //       'Email Unverified',
      //       'The email address ' +
      //         response.user.email +
      //         ' is unverified. Please verify to login.',
      //       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //       { cancelable: false }
      //     );
      //   }
      // })
      // .catch((error) => {
      //   Alert.alert(
      //     'Error',
      //     error.message,
      //     [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //     { cancelable: false }
      //   );
      // });
  }
  return (
    <View style={styles.container}>
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
        <Button onPress={() => { console.log('implement')}} title="Forgot Password?" />
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
});
