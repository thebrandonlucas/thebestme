import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function SettingsButton() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings', { test: 1})}>
      <Ionicons
        name="settings-sharp"
        size={27}
        style={{ marginRight: 30 }}
        color={Colors[colorScheme].tabIconDefault}
      />
    </TouchableOpacity>
  );
}
