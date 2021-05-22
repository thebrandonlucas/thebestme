import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Go Back" />
      <Text style={styles.title}>Settings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
