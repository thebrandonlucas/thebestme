import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function QuestionButton() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <AntDesign
        name="questioncircle"
        size={15}
        style={{ marginTop: 50 }}
        color={Colors[colorScheme].tabIconDefault}
      />
    </TouchableOpacity>
  );
}
