import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Contacts from 'expo-contacts';
import { useEffect } from 'react';

export default function SettingsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        await Contacts.presentFormAsync();
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
        
          const contact = data[0];
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === 'Sam') {
              console.log(data[i])
            }
          }
          console.log(contact);
        }
      }
    })();
  }, []);

  function getContacts() {

  }

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Go Back" />
      <Text style={styles.title}>Settings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Configure MyCircle Friends"
        onPress={getContacts}
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
